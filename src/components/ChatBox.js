import ChatUsers from "./ChatUsers.js";
import { useState, useEffect, useContext } from "react";
import Chat from "./Chat.js";
import AuthenticationContext from "../AuthenticationContext.js";

const ChatBox = ({ setIsChatOpen }) => {
  const [chattingWith, setChattingWith] = useState(null);
  const [users, setUsers] = useState([]);
  const authContext = useContext(AuthenticationContext);
  useEffect(() => {
    async function loadUsers() {
      let response = await fetch(`/api/loadUsers/${authContext.userId}`);
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
        <Chat chattingWith={chattingWith} />
      ) : (
        <ChatUsers users={users} setChattingWith={setChattingWith} />
      )}
    </div>
  );
};

export default ChatBox;
