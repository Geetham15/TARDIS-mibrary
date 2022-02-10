import ChatUsers from "./ChatUsers.js";
import { useState, useEffect, useContext } from "react";
import Chat from "./Chat.js";
import AuthenticationContext from "../AuthenticationContext.js";

const ChatBox = ({ setIsChatOpen, socket }) => {
  const [chattingWith, setChattingWith] = useState(null);
  const [users, setUsers] = useState([]);
  const authContext = useContext(AuthenticationContext);
  const deleteConversation = async (id) => {
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
      <div className="chatArea">
        {chattingWith ? (
          <Chat chattingWith={chattingWith} socket={socket} />
        ) : (
          <ChatUsers
            users={users}
            setChattingWith={setChattingWith}
            deleteConversation={deleteConversation}
          />
        )}
      </div>
    </div>
  );
};

export default ChatBox;
