import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MustBeLoggedIn from "./MustBeLoggedIn";
import { Badge } from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

function Footer({ setIsChatOpen, newMessages, setNewMessages }) {
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
            <Badge badgeContent={newMessages} color="secondary">
              <ChatBubbleIcon
                cursor="pointer"
                onClick={() => {
                  handleChatClick();
                }}
              />
            </Badge>
          </MustBeLoggedIn>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Footer;
