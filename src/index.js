import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LendBook from "./pages/LendBook";
import TradeBook from "./pages/TradeBook";
import SellBook from "./pages/SellBook";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";
import App from "./App";
import UserDashboard from "./pages/UserDashboard";
import AuthenticationProvider from "./AuthenticationProvider";
import AddBooks from "./components/AddBooks";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthenticationProvider>
      <Header />     
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/lend-a-book" element={<LendBook />} />
        <Route exact path="/trade-a-book" element={<TradeBook />} />
        <Route exact path="/sell-a-book" element={<SellBook />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/userDashboard" element={<UserDashboard />} />
        <Route exact path="/addBooks" element={<AddBooks />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </AuthenticationProvider>
    </BrowserRouter>
    <Footer />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
