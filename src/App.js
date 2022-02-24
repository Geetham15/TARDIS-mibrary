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
  const [lentBooks, setLentBooks] = useState([]);
  const [pendingRentals, setPendingRentals] = useState([]);
  const [tableDisplay, setTableDisplay] = useState(1);
  const [chattingWith, setChattingWith] = useState(null);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

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
      dueBookList = await dueBookList.sort((a, b) => {
        return a.daysLeftToReturn - b.daysLeftToReturn;
      });
      console.log(dueBookList);
      setBooksRented(dueBookList);
    }
    async function getBooks() {
      let fetchBook = await fetch(`/api/userBooks/${authContext.userId}`);
      let bookList = await fetchBook.json();
      setBooks(bookList);
    }
    async function getLentBooks() {
      let result = await fetch(`/api/getLentBooks/${authContext.userId}`);
      result = await result.json();
      console.log(result);
      setLentBooks(result);
    }
    async function loadPendingRentals() {
      let response = await fetch(
        `/api/getPendingRentals/${authContext.userId}`
      );
      response = await response.json();
      setPendingRentals(response);
    }
    async function loadAllBooks() {
      await getBooksRented();
      await getBooks();
      await getLentBooks();
      await loadPendingRentals();
      for (let book of booksRented) {
        if (book.daysLeftToReturn <= 4) {
          setBooksDueSoon(true);
        }
      }
    }
    if (authContext.userId) {
      loadAllBooks();
    }
  }, [authContext.userId]);

  return (
    <div>
      <NavBar booksDueSoon={booksDueSoon} setTableDisplay={setTableDisplay} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              bookData={bookData}
              setBookData={setBookData}
              setIsChatOpen={setIsChatOpen}
              setChattingWith={setChattingWith}
            />
          }
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
              tableDisplay={tableDisplay}
              setTableDisplay={setTableDisplay}
              lentBooks={lentBooks}
              pendingRentals={pendingRentals}
            />
          }
        />
        <Route exact path="/addBooks" element={<AddBooks />} />

        <Route exact path="/about" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {isChatOpen && (
        <ChatBox
          setIsChatOpen={setIsChatOpen}
          socket={socket}
          lentBooks={lentBooks}
          booksRented={booksRented}
          pendingRentals={pendingRentals}
          setChattingWith={setChattingWith}
          chattingWith={chattingWith}
        />
      )}
      <Footer setIsChatOpen={setIsChatOpen} />
    </div>
  );
}

export default App;
