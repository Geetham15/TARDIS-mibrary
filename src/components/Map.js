import React, {useState, useEffect} from 'react'
import ReactMapGL, {Marker, Popup, NavigationControl} from 'react-map-gl'
import bookspot from '../data/bookLocation.json'

const navControlStyle = {
    right: 10,
    top: 10
  }
const Map = () => {
    const [viewport, setViewport] = useState({
        latitude: 51.101948,
        longitude: -114.138359,
        width: '50vw',
        height: '50vh',
        zoom: 10
      })
    
      const [selectedBook, setSelectedBook] = useState(null)
    
      useEffect(() => {
        const listener = (e) => {
          if(e.key === 'Escape'){
            setSelectedBook(null)
          }
        };
        window.addEventListener("keydown", listener)
    
        return () => {
          window.removeEventListener("keydown", listener)
        }
      }, [])
  return (
    <div>
      <ReactMapGL {...viewport} mapboxApiAccessToken={'pk.eyJ1IjoiZ2VldGhhbTE1IiwiYSI6ImNreW45NnhlaTM0aDkyd2xrcjY1NDZtcXcifQ.yezSoNTMB6pFsqwXSQBlng'}
            mapStyle='mapbox://styles/mapbox/streets-v11'
            onViewportChange={viewport=>{setViewport(viewport)}}
      >
        <NavigationControl style={navControlStyle} />
      {bookspot.features.map((book) => (
        <Marker key={book.properties.bookId} latitude={book.geometry.coordinates[1]}
            longitude={book.geometry.coordinates[0]}>
          <button onClick={ e=> {
            e.preventDefault();
            setSelectedBook(book)
          }}> 
            <img src="/images/book2.jpeg"  style={{"height":"20px","width":"20px"}} alt="book icon"/>
          </button>
        </Marker>
      ))}
      {
        selectedBook ? (
          <Popup latitude={selectedBook.geometry.coordinates[1]}
                  longitude={selectedBook.geometry.coordinates[0]}
                  onClose={() => {
                    setSelectedBook(null)
                  }}>
            <div>
              <h4>{selectedBook.properties.title}</h4>
              
            </div>
          </Popup>
        ) : (null)
      }
    </ReactMapGL>
    </div>
  )
}

export default Map
