import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LendBook from "./pages/LendBook";
import TradeBook from "./pages/TradeBook";
import SellBook from "./pages/SellBook";
import NotFound from "./pages/NotFound";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/lend-a-book" element={<LendBook />} />
        <Route exact path="/trade-a-book" element={<TradeBook />} />
        <Route exact path="/sell-a-book" element={<SellBook />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <App /> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
