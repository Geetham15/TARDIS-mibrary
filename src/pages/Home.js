import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardList from "../components/CardList";
import BookList from "../components/BookList";
import AddBooks from "../components/AddBooks";
import Title from "../components/Title";
import Map from "../components/Map";
import Search from "../components/Search.js";

function Home() {
  return (
    <div>
      <Header />

      <Title name="MiBrary" />
      <CardList />
      {/* <BookList /> */}
      {/* <Map /> */}
      <Search />
      <Footer />
    </div>
  );
}

export default Home;
