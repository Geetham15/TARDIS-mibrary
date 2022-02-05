import { useState, useContext } from "react";
import CardList from "../components/CardList";
import BookList from "../components/BookList";
import AddBooks from "../components/AddBooks";
import Title from "../components/Title";
import Map from "../components/Map";
import Search from "../components/Search.js";
import AuthenticationContext from "../AuthenticationContext";

function Home() {
  const authContext = useContext(AuthenticationContext);
  const [entry, setEntry] = useState("");
  const [bookData, setBookData] = useState([]);
  return (
    <div className="container">
      <Title name="MiBrary" />
      <Search
        entry={entry}
        setEntry={setEntry}
        bookData={bookData}
        setBookData={setBookData}
      />
      {authContext.username && <Map bookData={bookData} />}
      {/* <CardList /> */}
      {/* <BookList /> */}
      {/* <Map /> */}
      {/* <Search /> */}
    </div>
  );
}

export default Home;
