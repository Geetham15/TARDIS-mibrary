import { useState, useEffect, useContext } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import { faBook, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthenticationContext from "../AuthenticationContext";
<<<<<<< HEAD
=======
import { Button } from "@mui/material";
>>>>>>> main

const navControlStyle = {
  right: 10,
  top: 10,
};

const Map = ({
  bookData,
  setIsChatOpen,
  setChattingWith,
  setPendingRentals,
  socket,
  loadAllBooks,
}) => {
  const authContext = useContext(AuthenticationContext);
  const [selectedBook, setSelectedBook] = useState(null);

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
      bookId: selectedBook.bookId,
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
    await loadAllBooks(authContext.userId, {
      booksRented: false,
      booksOwned: false,
      lentBooks: false,
      pending: true,
    });
    socket.current.emit("updateAllBooks", {
      id: selectedBook.user_id,
      options: {
        booksRented: false,
        booksOwned: false,
        lentBooks: false,
        pending: true,
      },
    });
    console.log(response.message);
    return response;
  };

  const initializeChat = async () => {
    setSelectedBook(null);
    let response = await sendInitialBorrowerChat();
    console.log(response);
    let response2 = await sendInitialLenderChat();
    console.log(response2);
    let response3 = await initializeTransaction();
    // setPendingRentals((old) => {
    //   old.push({
    //     bookowner_id: selectedBook.user_id,
    //     title: selectedBook.title,
    //     authors: selectedBook.authors,
    //     condition: selectedBook.condition,
    //     bookborrower_id: authContext.userId,
    //     bookId: selectedBook.id,
    //     dateBorrowed: null,
    //     dateDueForReturn: null,
    //     bookStatus: "pending",
    //     book_borrowing_id: response3.id[0][0].value,
    //   });
    //   return old;
    // });
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
        mapStyle="mapbox://styles/mapbox/navigation-day-v1"
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
              <p>
                <strong>Title:</strong>
              </p>
              <p>{selectedBook.title}</p>
              <p>
                <strong>Author:</strong>
              </p>
              <p>{selectedBook.authors}</p>
              <p>
                <strong>Condition:</strong>
              </p>
              <p>{selectedBook.condition}</p>
              {selectedBook.comments && (
                <div>
                  <p>
                    <strong>Comments:</strong>
                  </p>
                  <p>{selectedBook.comments}</p>
                </div>
              )}

              <Button
                variant="contained"
                color="secondary"
                onClick={initializeChat}
              >
                Chat
<<<<<<< HEAD
              </button>
=======
              </Button>
>>>>>>> main
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
};

export default Map;
