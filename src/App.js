import "./App.css";
import { useState, useEffect, useContext, useRef } from "react";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UserDashboard from "./pages/UserDashboard";
import AddBooks from "./components/AddBooks";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import AuthenticationContext from "./AuthenticationContext";
import LandingPage from "./pages/LandingPage";
import ChatBox from "./components/ChatBox";
import { io } from "socket.io-client";
import NavBar from "./components/NavBar";

function App() {
  const [bookData, setBookData] = useState([]);
  const [books, setBooks] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const socket = useRef();
  const authContext = useContext(AuthenticationContext);
  const [booksDueSoon, setBooksDueSoon] = useState(false);
  const [booksRented, setBooksRented] = useState([]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    async function getBooks() {
      let fetchBook = await fetch(`/api/userBooks/${authContext.userId}`);
      let bookList = await fetchBook.json();
      setBooks(bookList);
    }
    if (authContext.userId) {
      getBooks();
    }
  }, [authContext.userId]);

  useEffect(() => {
    if (authContext.userId) {
      socket.current.emit("addUser", authContext.userId);
      socket.current.on("getUsers", (users) => {
        console.log(users);
      });
    }
  }, [authContext.userId]);

  useEffect(() => {
    async function getBooksRented() {
      let dueBookList = await fetch(
        `/api/getBooksRented/${authContext.userId}`
      );
      dueBookList = await dueBookList.json();
      console.log(dueBookList);
      setBooksRented(dueBookList);
    }
    getBooksRented();
    for (let book of booksRented) {
      if (book.daysLeftToReturn <= 4) {
        setBooksDueSoon(true);
      }
    }
  }, [authContext.userId]);

  return (
    <div>
      <NavBar booksDueSoon={booksDueSoon} />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home bookData={bookData} setBookData={setBookData} />}
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          exact
          path="/userDashboard"
          element={
            <UserDashboard
              books={books}
              setBooks={setBooks}
              booksRented={booksRented}
            />
          }
        />
        <Route exact path="/addBooks" element={<AddBooks />} />

        <Route exact path="/about" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {isChatOpen && <ChatBox setIsChatOpen={setIsChatOpen} socket={socket} />}
      <Footer setIsChatOpen={setIsChatOpen} />
    </div>
  );
}

export default App;
