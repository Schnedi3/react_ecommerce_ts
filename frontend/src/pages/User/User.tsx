import { Login, Logout } from "../../Routes";
import { useAuthContext } from "../../context/useAuthContext";

export const User = () => {
  const { isAuthenticated } = useAuthContext();

  return <section>{isAuthenticated ? <Logout /> : <Login />}</section>;
};
