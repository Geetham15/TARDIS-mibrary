const ChatUsers = ({ users, setChattingWith, deleteConversation }) => {
  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user.id} className="userChat" style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p onClick={() => setChattingWith(user.id)}>{user.username}</p>
              <button
                onClick={() => deleteConversation(user.id)}
                className="btn"
                style={{ backgroundColor: "red" }}
              >
                end
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatUsers;
