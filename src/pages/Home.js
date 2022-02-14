import { React, useContext } from "react";
import Title from "../components/Title";
import Map from "../components/Map";
import Search from "../components/Search.js";
import AuthenticationContext from "../AuthenticationContext";
import Login from "./Login.js";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard"

function Home({ bookData, setBookData }) {
  const authContext = useContext(AuthenticationContext);
  return (
    <div>
    <NavBar/>
  
      <div className="home">
        <div className="home">
        
         
          {authContext.username ? (
            <div className="homeContainer">
              <Search bookData={bookData} setBookData={setBookData} />
              <Map bookData={bookData} />
     
            </div>
          ) : (
            <>
              
              <Login />
            </>
          )} 
        {/* <BookCard/> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
