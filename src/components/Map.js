import { useState, useEffect, useContext } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import { faBook, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthenticationContext from "../AuthenticationContext";

const navControlStyle = {
  right: 10,
  top: 10,
};
const Map = ({ bookData }) => {
  const authContext = useContext(AuthenticationContext);
  const [selectedBook, setSelectedBook] = useState(null);
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
  }, []);

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
                  setSelectedBook(book);
                }}
              >
                <FontAwesomeIcon icon={faBook} cursor="pointer" />
                {/* <img
                  src="/images/book2.jpeg"
                  style={{ height: "20px", width: "20px" }}
                  alt="book icon"
                /> */}
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
              <p>{selectedBook.title}</p>
              <p>{selectedBook.authors}</p>
              <button className="btn" onClick={initializeChat}>
                rent
              </button>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
};

export default Map;
