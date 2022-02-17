import { useState, useContext, useEffect, useRef } from "react";
import AuthenticationContext from "../AuthenticationContext.js";

const Chat = ({ chattingWith, socket }) => {
  const [toSend, setToSend] = useState("");
  const [previousMessages, setPreviousMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const sendMessage = async () => {
    setPreviousMessages([
      ...previousMessages,
      {
        fromUserId: authContext.userId,
        toUserId: chattingWith,
        message: toSend,
      },
    ]);
    let response = await fetch("/api/sendChat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromUserId: authContext.userId,
        toUserId: chattingWith,
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
      receiverId: chattingWith,
      text: toSend,
    });
    sendMessage();
    setToSend("");
  };
  const authContext = useContext(AuthenticationContext);

  useEffect(() => {
    async function loadMessages() {
      let response = await fetch(
        `/api/loadChats?fromUserId=${authContext.userId}&toUserId=${chattingWith}`
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
    <div>
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
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={toSend}
            onChange={(e) => setToSend(e.target.value)}
            style={{ width: "100%" }}
          />
          <button type="submit" className="btn btn-block">
            send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
