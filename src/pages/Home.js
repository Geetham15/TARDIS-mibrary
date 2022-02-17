import { React, useContext } from "react";
import Map from "../components/Map";
import Search from "../components/Search.js";
import AuthenticationContext from "../AuthenticationContext";
import Login from "./Login.js";

function Home({ bookData, setBookData }) {
  const authContext = useContext(AuthenticationContext);
  return (
    <div>
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
