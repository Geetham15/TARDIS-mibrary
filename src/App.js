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
  const [newMessages, setNewMessages] = useState(0);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    // socket.current.on("updatePendingStatus", (data) => {
    //   console.log("updating pending rental");
    //   setPendingRentals((old) => {
    //     old = old.map((book) => {
    //       if (book.book_borrowing_id === data.bookBorrowingId) {
    //         return {
    //           ...book,
    //           bookStatus: data.bookStatus,
    //           dateBorrowed: `${data.dateBorrowed}`,
    //           dateDueForReturn: `${data.dateDueForReturn}`,
    //         };
    //       } else {
    //         return book;
    //       }
    //     });
    //     return old;
    //   });
    // });
    socket.current.on("updateAllBooks", ({ id }) => {
      loadAllBooks(id);
    });
    // socket.current.on("confirmRental", ({ bookBorrowingId }) => {
    //   console.log("confirming rental");
    //   setBooksRented((old) => {
    //     let newRented = pendingRentals.filter((book) => {
    //       return book.book_borrowing_id === bookBorrowingId;
    //     });
    //     console.log([...old, newRented[0]]);
    //     return [...old, newRented[0]];
    //   });
    //   setPendingRentals((old) => {
    //     return old.filter((book) => {
    //       return book.book_borrowing_id !== bookBorrowingId;
    //     });
    //   });
    // });
    socket.current.on("initiateChat", (data) => {
      console.log("initiating chat");
      setPendingRentals((old) => {
        return [...old, data];
      });
    });
    // socket.current.on(
    //   "changeRentalStatus",
    //   ({ bookBorrowingId, bookStatus }) => {
    //     console.log("changing rental status");
    //     setLentBooks((old) => {
    //       let result = old.map((book) => {
    //         if (book.book_borrowing_id === bookBorrowingId) {
    //           return { ...book, bookStatus };
    //         }
    //         return book;
    //       });
    //       console.log(result);
    //       return result;
    //     });
    //   }
    // );
    // socket.current.on("confirmReturn", ({ bookBorrowingId }) => {
    //   console.log("confirming return");
    //   setBooksRented((old) => {
    //     old = old.filter((book) => {
    //       return book.book_borrowing_id !== bookBorrowingId;
    //     });
    //     console.log("updated books rented", old);
    //     return old;
    //   });
    // });
  }, []);

  useEffect(() => {
    if (authContext.userId) {
      socket.current.emit("addUser", authContext.userId);
      socket.current.on("getUsers", (users) => {
        //console.log(users);
      });
    }
  }, [authContext.userId]);

  async function getBooksRented(id = authContext.userId) {
    let dueBookList = await fetch(`/api/getBooksRented/${id}`);
    dueBookList = await dueBookList.json();
    dueBookList = await dueBookList.sort((a, b) => {
      return a.daysLeftToReturn - b.daysLeftToReturn;
    });
    console.log(dueBookList);
    setBooksRented(dueBookList);
  }
  async function getBooks(id = authContext.userId) {
    let fetchBook = await fetch(`/api/userBooks/${id}`);
    let bookList = await fetchBook.json();
    setBooks(bookList);
  }
  async function getLentBooks(id = authContext.userId) {
    let result = await fetch(`/api/getLentBooks/${id}`);
    result = await result.json();
    console.log(result);
    setLentBooks(result);
  }
  async function loadPendingRentals(id = authContext.userId) {
    let response = await fetch(`/api/getPendingRentals/${id}`);
    response = await response.json();
    setPendingRentals(response);
  }
  async function loadAllBooks(id = authContext.userId) {
    await getBooksRented(id);
    await getBooks(id);
    await getLentBooks(id);
    await loadPendingRentals(id);
    for (let book of booksRented) {
      if (book.daysLeftToReturn <= 4) {
        setBooksDueSoon(true);
      }
    }
  }

  useEffect(() => {
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
              setPendingRentals={setPendingRentals}
              socket={socket}
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
          setLentBooks={setLentBooks}
          booksRented={booksRented}
          pendingRentals={pendingRentals}
          setPendingRentals={setPendingRentals}
          setChattingWith={setChattingWith}
          chattingWith={chattingWith}
          setNewMessages={setNewMessages}
          loadAllBooks={loadAllBooks}
        />
      )}
      <Footer
        setIsChatOpen={setIsChatOpen}
        newMessages={newMessages}
        setNewMessages={setNewMessages}
      />
    </div>
  );
}

export default App;
