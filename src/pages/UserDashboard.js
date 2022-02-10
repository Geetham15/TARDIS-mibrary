import AuthenticationContext from "../AuthenticationContext";
import { useContext, useState } from "react";
import UserBooks from "../components/UserBooks.js";
import AddBooks from "../components/AddBooks";
import DataTable from "../components/Dashboard/DataTable"
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
      <DataTable/>
    </div>
  );
};

export default UserDashboard;
