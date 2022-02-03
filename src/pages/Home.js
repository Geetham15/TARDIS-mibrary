import React from "react";
import CardList from "../components/CardList";
import BookList from "../components/BookList";
import AddBooks from "../components/AddBooks";
import Title from "../components/Title";
import Map from "../components/Map";
import Search from "../components/Search.js";

function Home() {
    return (
        <div>
            <Title name="MiBrary" />
            <CardList />
            {/* <BookList /> */}
            {/* <Map /> */}
            {/* <Search /> */}
        </div>
    );
}

export default Home;
