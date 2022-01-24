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
      console.log(fetchBook);
      let bookList = await fetchBook.json();
      console.log(bookList);
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
            <th>User id</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => {
            return (
              <BookRow
                key={index}
                title={book.title}
                author={book.authors}
                user_id={book.user_id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
