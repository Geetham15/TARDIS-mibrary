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
            <a href="#" className="inline-flex">
              Lend-A-Book
            </a>
            <a href="#" className="inline-flex">
              Trade-A-Book
            </a>
            <a href="#" className="inline-flex">
              Buy/Sell-A-Book
            </a>
            <div>
              <button className="hover:bg-white rounded p-2 m-2">Login</button>
              <button className="hover:bg-white rounded p-2 m-2">SignUp</button>
            </div>
          </div>

          <FontAwesomeIcon
            icon={faUser}
            className="  flex absolute top-3 right-5 m-6  text-5xl items-center "
          />
        </header>
      </div>
    </>
  );
}

export default Header;
