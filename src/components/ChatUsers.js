import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { Divider } from "@mui/material";

const ChatUsers = ({ users, setChattingWith, deleteConversation }) => {
  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user.id} style={{ cursor: "pointer" }}>
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteConversation(user.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>{user.username[0].toUpperCase()}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.username}
                onClick={() => setChattingWith(user)}
                secondary={user.id}
              />
            </ListItem>
            <Divider />
          </div>
        );
      })}
    </div>
  );
};

export default ChatUsers;
