import React, { useEffect, useState } from "react";

const BookRow = ({ title, author, description }) => (
  <tr>
    <td>{title}</td>
    <td>{author}</td>
    <td>{description}</td>
  </tr>
);
const BookList = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    async function getBooks() {
      let fetchBook = await fetch("/api/bookList");
      let bookList = await fetchBook.json();
      setBooks(bookList);
    }
    getBooks();
  }, []);

  return (
    <div>
      <h2>Book List</h2>
      <table>
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Author</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => {
            return (
              <BookRow
                key={index}
                title={book.title}
                author={book.authors}
                description={book.description ? book.description : ""}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
