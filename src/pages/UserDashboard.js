import AuthenticationContext from "../AuthenticationContext";
import { useContext } from "react";
import UserBooks from "../components/UserBooks.js";
import AddBooks from "../components/AddBooks";

const UserDashboard = () => {
  const authContext = useContext(AuthenticationContext);
  return (
    <div>
      <UserBooks />
      <AddBooks />
    </div>
  );
};

export default UserDashboard;
