import { useState, useEffect, useContext } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import { faBook, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthenticationContext from "../AuthenticationContext";
import Modal from "react-modal";
import BooksToLend from "./BooksToLend";

const navControlStyle = {
  right: 10,
  top: 10,
};
Modal.setAppElement("#root");
const Map = ({
  bookData,
  setIsChatOpen,
  setChattingWith,
  setPendingRentals,
  socket,
}) => {
  const authContext = useContext(AuthenticationContext);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const sendInitialBorrowerChat = async () => {
    let response = await fetch("/api/sendChat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromUserId: authContext.userId,
        toUserId: selectedBook.user_id,
        message: `Hello, I'd like to borrow ${selectedBook.title}. (automatic message)`,
      }),
    });
    response = await response.json();
    return response;
  };
  const sendInitialLenderChat = async () => {
    let response2 = await fetch("/api/sendChat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromUserId: selectedBook.user_id,
        toUserId: authContext.userId,
        message: `Hello, I'd like to lend ${selectedBook.title}. (automatic message)`,
      }),
    });
    response2 = await response2.json();
    return response2;
  };
  const initializeTransaction = async () => {
    let data = {
      bookowner_id: selectedBook.user_id,
      bookborrower_id: authContext.userId,
      bookId: selectedBook.id,
      dateBorrowed: null,
      dateDueForReturn: null,
      bookStatus: "pending",
    };
    let response = await fetch("/api/bookOutOnLoan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    response = await response.json();
    socket.current.emit("initiateChat", {
      ...data,
      book_borrowing_id: response.id[0][0].value,
    });
    alert(response.message);
    return response;
  };

  const initializeChat = async () => {
    setSelectedBook(null);
    let response = await sendInitialBorrowerChat();
    console.log(response);
    let response2 = await sendInitialLenderChat();
    console.log(response2);
    let response3 = await initializeTransaction();
    setPendingRentals((old) => {
      old.push({
        bookowner_id: selectedBook.user_id,
        title: selectedBook.title,
        authors: selectedBook.authors,
        condition: selectedBook.condition,
        bookborrower_id: authContext.userId,
        bookId: selectedBook.id,
        dateBorrowed: null,
        dateDueForReturn: null,
        bookStatus: "pending",
        book_borrowing_id: response3.id[0][0].value,
      });
      return old;
    });
    setChattingWith({
      id: selectedBook.user_id,
      username: selectedBook.userName,
    });
    setIsChatOpen(true);
  };

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "50vh",
    zoom: 10,
  });

  useEffect(() => {
    setViewport({
      ...viewport,
      latitude: authContext.latitude,
      longitude: authContext.longitude,
    });
  }, [authContext.latitude, authContext.longitude]);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedBook(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={
          "pk.eyJ1IjoiZ2VldGhhbTE1IiwiYSI6ImNreW45NnhlaTM0aDkyd2xrcjY1NDZtcXcifQ.yezSoNTMB6pFsqwXSQBlng"
        }
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        <NavigationControl style={navControlStyle} />
        {bookData &&
          bookData.map((book) => (
            <Marker
              key={book.id}
              latitude={book.latitude}
              longitude={book.longitude}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log("bookId", book.id);
                  setSelectedBook(book);
                }}
              >
                <FontAwesomeIcon icon={faBook} cursor="pointer" />
              </button>
            </Marker>
          ))}
        <Marker
          latitude={authContext.latitude || 0}
          longitude={authContext.longitude || 0}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <FontAwesomeIcon icon={faHome} cursor="pointer" />
          </button>
        </Marker>

        {selectedBook ? (
          <Popup
            latitude={selectedBook.latitude}
            longitude={selectedBook.longitude}
            onClose={() => {
              setSelectedBook(null);
            }}
          >
            <div>
              <p>Title: {selectedBook.title}</p>
              <p>Author: {selectedBook.authors}</p>
              <p>Condition: {selectedBook.condition}</p>
              <p>Comments: {selectedBook.comments}</p>
              <button className="btn" onClick={initializeChat}>
                Chat
              </button>
              <button className="btn" onClick={() => setModalIsOpen(true)}>
                Borrow
              </button>
              <Modal
                isOpen={modalIsOpen}
                selectedBook={selectedBook}
                shouldCloseOnOverlayClick={false}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                  overlay: {
                    backgroundColor: "grey",
                  },
                  content: {
                    color: "black",
                  },
                }}
              >
                <BooksToLend
                  selectedBook={selectedBook}
                  initializeChat={initializeChat}
                />
                <div>
                  <button onClick={() => setModalIsOpen(false)}>Close</button>
                </div>
              </Modal>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
};

export default Map;
