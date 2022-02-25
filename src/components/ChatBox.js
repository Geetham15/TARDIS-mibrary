import ChatUsers from "./ChatUsers.js";
import { useState, useEffect, useContext } from "react";
import Chat from "./Chat.js";
import AuthenticationContext from "../AuthenticationContext.js";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import List from "@mui/material/List";

const ChatBox = ({
  setIsChatOpen,
  socket,
  lentBooks,
  booksRented,
  pendingRentals,
  setChattingWith,
  chattingWith,
  setNewMessages,
}) => {
  const [users, setUsers] = useState([]);
  const authContext = useContext(AuthenticationContext);
  const deleteConversation = async (id) => {
    for (const book of lentBooks) {
      if (book.bookborrower_id === id) {
        alert(
          "You can't delete this conversation because you are currently lending a book to this user."
        );
        return;
      }
    }
    for (const book of booksRented) {
      if (book.bookowner_id === id) {
        alert(
          "You can't delete this conversation because you are currently renting from this user."
        );
        return;
      }
    }
    const confirmation = window.confirm(
      "Are you sure you want to end this chat?"
    );
    if (!confirmation) {
      return;
    }
    setUsers((old) => {
      return old.filter((user) => {
        return user.toUserId !== id;
      });
    });
    let response = await fetch("/api/deleteConversation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        userId: authContext.userId,
      }),
    });
    response = await response.json();
    console.log(response);
  };
  useEffect(() => {
    async function loadUsers() {
      let response = await fetch(`/api/loadUsers/${authContext.userId}`);
      response = await response.json();
      setUsers(response);
    }
    loadUsers();
  }, []);

  return (
    <div className="chatBox">
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <AppBar position="static">
          <Toolbar>
            {chattingWith && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setChattingWith(null)}
              >
                <ArrowBackIcon />
              </IconButton>
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {chattingWith ? chattingWith.username : "Chat"}
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                setIsChatOpen((old) => !old);
                setChattingWith(null);
              }}
            >
              x
            </Button>
          </Toolbar>
        </AppBar>

        <List style={{ backgroundColor: "white" }}>
          {chattingWith ? (
            <Chat
              chattingWith={chattingWith}
              socket={socket}
              pendingRentals={pendingRentals}
              setNewMessages={setNewMessages}
            />
          ) : (
            <div
              style={{
                overflowY: "scroll",
                height: 350,
              }}
            >
              <ChatUsers
                users={users}
                setChattingWith={setChattingWith}
                deleteConversation={deleteConversation}
              />
            </div>
          )}
        </List>
      </Box>
    </div>
  );
};

export default ChatBox;
