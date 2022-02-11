import { useContext } from "react";
import Title from "../components/Title";
import Map from "../components/Map";
import Search from "../components/Search.js";
import AuthenticationContext from "../AuthenticationContext";
import Login from "./Login.js";

function Home({ bookData, setBookData }) {
  const authContext = useContext(AuthenticationContext);
  return (
    <div className="home">
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
