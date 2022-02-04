import AuthenticationContext from "../AuthenticationContext";
import { useContext, useState } from "react";
import UserBooks from "../components/UserBooks.js";
import AddBooks from "../components/AddBooks";

const UserDashboard = () => {
  const [bookData, setBookData] = useState({
    comments: "",
    condition: "gently used",
  });
  const [books, setBooks] = useState([]);
  return (
    <div>
      <UserBooks books={books} setBooks={setBooks} />
      <AddBooks
        bookData={bookData}
        setBookData={setBookData}
        setBooks={setBooks}
        books={books}
      />
    </div>
  );
};

export default UserDashboard;
