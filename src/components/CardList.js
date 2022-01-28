import React from "react";
import Card from "./Card";
function CardList() {
  return (
    <div className="flex justify-center m-auto gap-4 w-screen-80px p-4">
      <Card name="Lend" address="" image="book1.jpg" />

      <Card name="Borrow" address="" image="book2.jpeg" />

      <Card name="Buy/Sell" address="" image="book3.jpg" />
    </div>
  );
}

export default CardList;
