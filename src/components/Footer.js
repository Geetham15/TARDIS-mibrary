import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import MustBeLoggedIn from "./MustBeLoggedIn";
function Footer({ setIsChatOpen }) {
  //   const handleChatClick = async () => {
  //     let response = await fetch("/api/sendChat", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         fromUserId: 1,
  //         toUserId: 2,
  //         message: "Hello World",
  //       }),
  //     });
  //     response = await response.json();
  //     console.log(response);
  //   };
  const handleChatClick = () => {
    setIsChatOpen((old) => {
      return !old;
    });
  };
  return (
    <div>
      <header
        className="bg-blue-400  p-2 items-center flex justify-around  "
        style={{ position: "fixed", bottom: "0", width: "100%" }}
      >
        <h1>2022 © MiBrary</h1>
        <MustBeLoggedIn>
          <FontAwesomeIcon
            icon={faCommentAlt}
            cursor="pointer"
            onClick={handleChatClick}
          />
        </MustBeLoggedIn>
      </header>
    </div>
  );
}

export default Footer;
