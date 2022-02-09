import "./App.css";
import { useState, useEffect, useContext } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import UserDashboard from "./pages/UserDashboard";
import AddBooks from "./components/AddBooks";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import AuthenticationContext from "./AuthenticationContext";
import LandingPage from "./pages/LandingPage";
import ChatBox from "./components/ChatBox";

function App() {
  const [bookData, setBookData] = useState([]);
  const [books, setBooks] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const authContext = useContext(AuthenticationContext);
  useEffect(() => {
    async function getBooks() {
      let fetchBook = await fetch(`/api/userBooks/${authContext.userId}`);
      let bookList = await fetchBook.json();
      console.log(bookList);
      setBooks(bookList);
    }
    if (authContext.userId) {
      getBooks();
    }
  }, [authContext.userId]);

  return (
    <div>
      <Header />
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
          element={<UserDashboard books={books} setBooks={setBooks} />}
        />
        <Route exact path="/addBooks" element={<AddBooks />} />
        <Route exact path="about" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {isChatOpen && <ChatBox setIsChatOpen={setIsChatOpen} />}
      <Footer setIsChatOpen={setIsChatOpen} />
    </div>
  );
}

export default App;
