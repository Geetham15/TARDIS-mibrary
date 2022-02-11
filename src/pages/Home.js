import {React , useContext } from "react";
import Title from "../components/Title";
import Map from "../components/Map";
import Search from "../components/Search.js";
import AuthenticationContext from "../AuthenticationContext";
import Login from "./Login.js";
import NavBar from '../components/Card'
import Header from "../components/Header";
function Home({ bookData, setBookData }) {
  const authContext = useContext(AuthenticationContext);
  return (
<<<<<<< HEAD
    <div>
  <NavBar/>
=======
    <div className="home">
>>>>>>> main
      {authContext.username ? (
        <div className="homeContainer">
          <Search bookData={bookData} setBookData={setBookData} />
          <Map bookData={bookData} />
        </div>
      ) : (
        <>
          <Title name="MiBrary" />
          <Login />
        </>
      )}
      {/* <CardList /> */}
    </div>
  );
}

export default Home;
