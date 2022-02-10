import ChatUsers from "./ChatUsers.js";
import { useState, useEffect, useContext } from "react";
import Chat from "./Chat.js";

const ChatBox = ({ setIsChatOpen, socket, users }) => {
  const [chattingWith, setChattingWith] = useState(null);

  return (
    <div className="chatBox">
      <div className="chatBoxHeading">
        <p style={{ color: "white", textAlign: "center" }}>Chat</p>
        <button
          onClick={() => setIsChatOpen((old) => !old)}
          className="btn"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            height: "30px",
            width: "5px",
            fontSize: "10px",
          }}
        >
          x
        </button>
      </div>
      {chattingWith ? (
        <Chat chattingWith={chattingWith} socket={socket} />
      ) : (
        <ChatUsers users={users} setChattingWith={setChattingWith} />
      )}
    </div>
  );
};

export default ChatBox;
