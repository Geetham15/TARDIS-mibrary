import { useState } from "react";
import CardList from "../components/CardList";
import BookList from "../components/BookList";
import AddBooks from "../components/AddBooks";
import Title from "../components/Title";
import Map from "../components/Map";
import Search from "../components/Search.js";

function Home() {

  const [entry, setEntry] = useState("");
  const [bookData, setBookData] = useState(null);
  return (
    <div className="container">
      <Title name="MiBrary" />
      <Search
        entry={entry}
        setEntry={setEntry}
        bookData={bookData}
        setBookData={setBookData}
      />
      <Map bookData={bookData} />
      {/* <CardList /> */}
      {/* <BookList /> */}
      {/* <Map /> */}
      {/* <Search /> */}
    </div>
  );

}

export default Home;
