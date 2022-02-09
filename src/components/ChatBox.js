import ChatUsers from "./ChatUsers.js";
import { useState, useEffect } from "react";
import Chat from "./Chat.js";

const ChatBox = () => {
  const [chattingWith, setChattingWith] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      let response = await fetch("/api/loadUsers");
      response = await response.json();
      console.log(response);
      setUsers(response);
    }
    loadUsers();
  }, []);
  return (
    <div className="chatBox">
      <div className="chatBoxHeading">
        <p style={{ color: "white", textAlign: "center" }}>Chat</p>
      </div>
      {chattingWith ? (
        <Chat chattingWith={chattingWith} />
      ) : (
        <ChatUsers users={users} setChattingWith={setChattingWith} />
      )}
    </div>
  );
};

export default ChatBox;
