import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MustBeLoggedIn from "./MustBeLoggedIn";

function Footer({ setIsChatOpen }) {
  const handleChatClick = () => {
    setIsChatOpen((old) => {
      return !old;
    });
  };

  return (
    <div>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar className=" p-5 mr-4 items-center flex justify-around  ">
          <Typography variant="subtitle" position="static">
            2022 © MiBrary
          </Typography>

          <MustBeLoggedIn>
            <FontAwesomeIcon
              icon={faCommentAlt}
              cursor="pointer"
              onClick={handleChatClick}
            />
          </MustBeLoggedIn>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Footer;
