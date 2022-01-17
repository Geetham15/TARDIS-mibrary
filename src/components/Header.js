import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <>
      <div>
        <header className="bg-blue-400  p-2 items-center  ">
          {/* <h1 className="text-center">MiBrary Book Exchange App</h1> */}
  
          <div className="flex justify-around items-center">
            {" "}
            Image
            <a href="lend-a-book" className="inline-flex">
              Lend-A-Book
            </a>
            <a href="trade-a-book" className="inline-flex">
              Trade-A-Book
            </a>
            <a href="sell-a-book" className="inline-flex">
              Buy/Sell-A-Book
            </a>
            <div>
              <button className="hover:bg-white rounded p-2 m-2">Login</button>
              <button className="hover:bg-white rounded p-2 m-2">SignUp</button>
          <FontAwesomeIcon
            icon={faUser}
            className="  flex absolute top-2 right-5 mb-3 mt-1  text-5xl items-center "
          />
            </div>
          </div>

        </header>
      </div>
    </>
  );
}

export default Header;
