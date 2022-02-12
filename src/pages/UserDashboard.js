import { useState } from "react";
import UserBooks from "../components/UserBooks.js";
import AddBooks from "../components/AddBooks";
import DataTable from "../components/Dashboard/DataTable"
import NavBar from '../components/NavBar'
import ChangePostalCode from "../components/ChangePostalCode";
import Footer from "../components/Footer"
const UserDashboard = ({ books, setBooks }) => {
  const [bookData, setBookData] = useState({
    comments: "",
    condition: "gently used",
  });
  return (
    <div>
    <NavBar />
   
      <UserBooks books={books} setBooks={setBooks} />
      <AddBooks
        bookData={bookData}
        setBookData={setBookData}
        setBooks={setBooks}
        books={books}
      />
      {/* <DataTable/>
      <ChangePostalCode /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default UserDashboard;
