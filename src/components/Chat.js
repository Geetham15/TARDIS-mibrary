import { useState, useContext, useEffect, useRef } from "react";
import AuthenticationContext from "../AuthenticationContext.js";

const Chat = ({ chattingWith }) => {
  const [toSend, setToSend] = useState("");
  const [previousMessages, setPreviousMessages] = useState([]);
  const sendMessage = async (userId) => {
    setPreviousMessages([
      ...previousMessages,
      { fromUserId: authContext.userId, toUserId: userId, message: toSend },
    ]);
    let response = await fetch("/api/sendChat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromUserId: authContext.userId,
        toUserId: userId,
        message: toSend,
      }),
    });
    response = await response.json();
    console.log(response);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage(chattingWith);
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
