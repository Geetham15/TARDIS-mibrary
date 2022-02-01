import React, {useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome, faBars } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import AuthenticationContext from "../AuthenticationContext";
import MustBeLoggedIn from "./MustBeLoggedIn";

function Header() {
  const authContext = useContext(AuthenticationContext)
  return (
    <>
      <div style={{ marginBottom: 50 }}>
        <header className="bg-blue-400  p-2 items-center flex justify-around  ">
          {/* <h1 className="text-center">MiBrary Book Exchange App</h1> */}

          {/* Logo goes here link to home */}
          <FontAwesomeIcon
            icon={faBars}
            className="  flex absolute top-2 mb-3 mt-1 left-10 text-5xl items-center "
            cursor="pointer"
          />
          <NavLink exact to="/">
            <FontAwesomeIcon
              icon={faHome}
              className="  flex absolute top-2 mb-3 mt-1 left-21 text-5xl items-center "
            />
          </NavLink>
          <h1
            className="flex absolute top-2 mb-3 mt-1 left-50 text-5xl items-center"
            style={{ fontSize: 40 }}
          >
            Mibrary
          </h1>
          {/* <NavLink exact to="/lend-a-book">
            Lend-A-Book
          </NavLink>
          <NavLink exact to="/trade-a-book">
            Trade-A-Book
          </NavLink>
          <NavLink exact to="/sell-a-book">
            Buy/Sell-A-Book
          </NavLink> */}

          <div>
          {authContext.username && <p> Hello {authContext.username}!</p>}
          
          <MustBeLoggedIn>
              <NavLink exact to="/logout">
              <button className="hover:bg-white rounded p-2 m-2" onClick={authContext.logOut}>LogOut</button>
              </NavLink>
            </MustBeLoggedIn>
          {!authContext.username && (
            <NavLink exact to="/login">
              <button className="hover:bg-white rounded p-2 m-2">Login</button>
            </NavLink>
          )}

            {!authContext.username && (
            <NavLink exact to="./signup">
              <button className="hover:bg-white rounded p-2 m-2">SignUp</button>
            </NavLink>
            )}
            <NavLink exact to="./userDashboard">
              <FontAwesomeIcon
                icon={faUser}
                className="  flex absolute top-2 right-10 mb-3 mt-1  text-5xl items-center "
                cursor="pointer"
              />
            </NavLink>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;
