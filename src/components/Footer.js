import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
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

  //  const classes = useStyles();
  return (
    <div>
      {/* // style={{ position: "static", bottom: "0", width: "100%" }} */}
      <AppBar
        position="static"
        component="div"
       
    
      >
        <Toolbar>
          <Typography variant="h6" component="label" position="static">
            2022 © MiBrary
          </Typography>

          <Typography className=" p-5 mr-4 items-center flex justify-around  ">
            <MustBeLoggedIn>
              <FontAwesomeIcon
                icon={faCommentAlt}
                cursor="pointer"
                onClick={handleChatClick}
              />
            </MustBeLoggedIn>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Footer;
