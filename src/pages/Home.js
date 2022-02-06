import { useContext } from "react";
import Title from "../components/Title";
import Map from "../components/Map";
import Search from "../components/Search.js";
import AuthenticationContext from "../AuthenticationContext";

function Home({ bookData, setBookData }) {
  const authContext = useContext(AuthenticationContext);
  return (
    <div className="container">
      <Title name="MiBrary" />
      <Search bookData={bookData} setBookData={setBookData} />
      {authContext.username && <Map bookData={bookData} />}
      {/* <CardList /> */}
    </div>
  );
}

export default Home;
