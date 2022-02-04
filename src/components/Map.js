import { useState, useEffect, useContext } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import {
  faArrowAltCircleDown,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthenticationContext from "../AuthenticationContext";

const navControlStyle = {
  right: 10,
  top: 10,
};
const Map = ({ bookData }) => {
  const [viewport, setViewport] = useState({
    latitude: 51.101948,
    longitude: -114.138359,
    width: "50vw",
    height: "50vh",
    zoom: 10,
  });

  const authContext = useContext(AuthenticationContext);

  const [selectedBook, setSelectedBook] = useState(null);

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
                <FontAwesomeIcon icon={faArrowAltCircleDown} cursor="pointer" />
                {/* <img
                  src="/images/book2.jpeg"
                  style={{ height: "20px", width: "20px" }}
                  alt="book icon"
                /> */}
              </button>
            </Marker>
          ))}
        {/* <Marker
          latitude={authContext.latitude}
          longitude={authContext.longitude}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <FontAwesomeIcon icon={faArrowAltCircleDown} cursor="pointer" />
          </button>
        </Marker> */}

        {selectedBook ? (
          <Popup
            latitude={selectedBook.latitude}
            longitude={selectedBook.longitude}
            onClose={() => {
              setSelectedBook(null);
            }}
          >
            <div>
              <h4>{selectedBook.title}</h4>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
};

export default Map;
