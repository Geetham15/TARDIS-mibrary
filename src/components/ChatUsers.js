const ChatUsers = ({ users, setChattingWith }) => {
  return (
    <div>
      {users.map((user) => {
        return (
          <div
            key={user.id}
            className="userChat"
            onClick={() => setChattingWith(user.id)}
            style={{ cursor: "pointer" }}
          >
            <p>{user.username}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ChatUsers;
