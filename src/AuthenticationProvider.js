import React, { useState, useEffect } from "react";
import AuthenticationContext from "./AuthenticationContext";

const AuthenticationProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const logIn = (logInUsername, logInUserId, loginLatitude, loginLongitude) => {
    setUsername(logInUsername);
    setUserId(logInUserId);
    setLatitude(loginLatitude);
    setLongitude(loginLongitude);
  };
  const logOut = () => {
    setUsername("");
    setUserId("");
    setLatitude(0);
    setLongitude(0);
  };
  useEffect(() => {
    const getLoggedInUser = () => {
      if (window.sessionStorage.getItem("user_id")) {
        console.log("Going to get session storage variables");
        logIn(
          window.sessionStorage.getItem("username"),
          window.sessionStorage.getItem("user_id"),
          window.sessionStorage.getItem("latitude"),
          window.sessionStorage.getItem("longitude")
        );
      }
    };
    getLoggedInUser();
  }, []);
  const authContext = { userId, username, latitude, longitude, logIn, logOut };
  return (
    <AuthenticationContext.Provider value={authContext}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
