import { useState } from "react";
import UserBooks from "../components/UserBooks.js";
import AddBooks from "../components/AddBooks";
import ChangePostalCode from "../components/ChangePostalCode";

const UserDashboard = ({ books, setBooks }) => {
  const [bookData, setBookData] = useState({
    comments: "",
    condition: "gently used",
  });
  return (
    <div>
      <UserBooks books={books} setBooks={setBooks} />
      <AddBooks
        bookData={bookData}
        setBookData={setBookData}
        setBooks={setBooks}
        books={books}
      />
      <ChangePostalCode />
    </div>
  );
};

export default UserDashboard;
