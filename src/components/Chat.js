import { useState, useContext, useEffect, useRef } from "react";
import AuthenticationContext from "../AuthenticationContext.js";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import FormDialog from "./FormDialog.js";

const Chat = ({ chattingWith, socket }) => {
  const [toSend, setToSend] = useState("");
  const [previousMessages, setPreviousMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [pendingRentals, setPendingRentals] = useState([]);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [previousMessages]);
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
  const authContext = useContext(AuthenticationContext);

  useEffect(() => {
    async function loadMessages() {
      let response = await fetch(
        `/api/loadChats?fromUserId=${authContext.userId}&toUserId=${chattingWith.id}`
      );
      response = await response.json();
      setPreviousMessages(response);
    }
    async function loadPendingRentals() {
      let response = await fetch(
        `/api/getPendingRentals?bookOwnerId=${chattingWith.id}&bookBorrowerId=${authContext.userId}`
      );
      response = await response.json();
      setPendingRentals(response);
    }
    async function loadAll() {
      await loadMessages();
      await loadPendingRentals();
    }
    loadAll();
    console.log(pendingRentals);
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
        <FormDialog pendingRentals={pendingRentals} />
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
