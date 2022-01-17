import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import LendBook from "../pages/LendBook";
function Header() {
  return (
    <>
      <div>
        <header className="bg-blue-400  p-2 items-center flex justify-around  ">
          {/* <h1 className="text-center">MiBrary Book Exchange App</h1> */}
         
            {/* Logo goes here link to home */}
            <NavLink exact to="/">
              Home
            </NavLink>
            <NavLink exact to="/lend-a-book">
              Lend-A-Book
            </NavLink>
            <NavLink exact to="/trade-a-book">
              Trade-A-Book
            </NavLink>
            <NavLink exact to="/sell-a-book">
              Buy/Sell-A-Book
            </NavLink>
         
         
          <div>
            <button className="hover:bg-white rounded p-2 m-2">Login</button>
            <button className="hover:bg-white rounded p-2 m-2">SignUp</button>
            <FontAwesomeIcon
              icon={faUser}
              className="  flex absolute top-2 right-5 mb-3 mt-1  text-5xl items-center "
            />
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;
