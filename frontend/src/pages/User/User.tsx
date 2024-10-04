import { useAuthContext } from "../../context/useAuthContext";
import { Login, Logout } from "../../Routes";

export const User = () => {
  const { isAuthenticated } = useAuthContext();

  return <section>{isAuthenticated ? <Logout /> : <Login />}</section>;
};
