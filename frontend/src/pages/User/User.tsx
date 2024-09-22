import { Login } from "../Login/Login";
import { Logout } from "../Logout/Logout";
import { useAuthContext } from "../../context/useAuthContext";

export const User = () => {
  const { isAuthenticated } = useAuthContext();

  return <section>{isAuthenticated ? <Logout /> : <Login />}</section>;
};
