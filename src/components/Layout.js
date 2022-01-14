import React from "react";
import Home from "../pages/Home";
import Header from "./Header";
import Footer from "./Footer";
function Layout({ children }) {
  return (
    <div>
     
    <Home/>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
