import { useState, useContext, useEffect, useRef } from "react";
import AuthenticationContext from "../AuthenticationContext.js";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import FormDialog from "./FormDialog.js";

const Chat = ({ chattingWith, socket, pendingRentals }) => {
  const [toSend, setToSend] = useState("");
  const [previousMessages, setPreviousMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [pendingRentalsPerUser, setPendingRentalsPerUser] = useState();
  const messagesEndRef = useRef(null);
  const authContext = useContext(AuthenticationContext);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [previousMessages]);

  useEffect(() => {
    setPendingRentalsPerUser(() => {
      return pendingRentals.filter((rental) => {
        return (
          rental.bookborrower_id === authContext.userId ||
          rental.bookowner_id === authContext.userId
        );
      });
    });
  }, []);

  const sendMessage = async () => {
    setPreviousMessages([
      ...previousMessages,
      {
        fromUserId: authContext.userId,
        toUserId: chattingWith.id,
        message: toSend,
      },
    ]);
    let response = await fetch("/api/sendChat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromUserId: authContext.userId,
        toUserId: chattingWith.id,
        message: toSend,
      }),
    });
    response = await response.json();
    console.log(response);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    socket.current.emit("sendMessage", {
      senderId: authContext.userId,
      receiverId: chattingWith.id,
      text: toSend,
    });
    sendMessage();
    setToSend("");
  };

  useEffect(() => {
    async function loadMessages() {
      let response = await fetch(
        `/api/loadChats?fromUserId=${authContext.userId}&toUserId=${chattingWith.id}`
      );
      response = await response.json();
      setPreviousMessages(response);
    }
    loadMessages();
  }, []);

  useEffect(() => {
    arrivalMessage && setPreviousMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        fromUserId: data.senderId,
        toUserId: data.receiverId,
        message: data.text,
      });
    });
  }, []);

  return (
    <>
      <Box
        sx={{
          width: 300,
          height: 250,
          display: "flex",
          overflowY: "scroll",
          flexDirection: "column",
        }}
      >
        {previousMessages.map((message) => {
          return (
            <div
              className={
                message.fromUserId === authContext.userId
                  ? "chatSent"
                  : "chatReceived"
              }
            >
              <div
                className={
                  message.fromUserId === authContext.userId
                    ? "singleMessageSent"
                    : "singleMessageReceived"
                }
              >
                <p style={{ color: "white" }}>{message.message}</p>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </Box>
      <Box>
        {pendingRentalsPerUser && (
          <FormDialog pendingRentalsPerUser={pendingRentalsPerUser} />
        )}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={toSend}
            onChange={(e) => setToSend(e.target.value)}
            style={{ width: "100%" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ width: "100%", marginTop: "auto" }}
          >
            send
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Chat;
