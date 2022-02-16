import { useState, useEffect, useContext } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import { faBook, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthenticationContext from "../AuthenticationContext";
import Modal from 'react-modal';
import BooksToLend from "./BooksToLend";

const navControlStyle = {
  right: 10,
  top: 10,
};
Modal.setAppElement('#root')
const Map = ({ bookData }) => {
  const authContext = useContext(AuthenticationContext);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false)
  
  const sendInitialBorrowerChat = async () => {
    let response = await fetch("/api/sendChat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromUserId: authContext.userId,
        toUserId: selectedBook.id,
        message: `Hello, I'd like to borrow ${selectedBook.title}.`,
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
        fromUserId: selectedBook.id,
        toUserId: authContext.userId,
        message: `Hello, I'd like to lend ${selectedBook.title}.`,
      }),
    });
    response2 = await response2.json();
    return response2;
  };
  const initializeChat = async () => {
    setSelectedBook(null);
    let response = await sendInitialBorrowerChat();
    console.log(response);
    let response2 = await sendInitialLenderChat();
    console.log(response2);
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
                  console.log('bookId', book.id)
                  setSelectedBook(book);
                }}
              >
                <FontAwesomeIcon icon={faBook} cursor="pointer" />
              </button>
            </Marker>
          ))}
        <Marker
          latitude={authContext.latitude}
          longitude={authContext.longitude}
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
              <button className="btn" onClick={initializeChat}>
                rent
              </button>
              <button className="btn" onClick={()=>setModalIsOpen(true)}>Fill details to Barrow Book</button>
                <Modal isOpen={modalIsOpen} selectedBook={selectedBook}
                        shouldCloseOnOverlayClick={false} 
                        onRequestClose={()=>setModalIsOpen(false)}
                        style={
                          {
                            overlay:{
                              backgroundColor: 'grey'
                            },
                            content:{
                              color:'black'
                            }
                          }
                        }>
                  <BooksToLend selectedBook={selectedBook}/>                
                  <div>
                    <button onClick={()=> setModalIsOpen(false)}>Close</button>
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
