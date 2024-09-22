import { useAuthContext } from "../../context/useAuthContext";
import "./logout.css";

export const Logout = () => {
  const { logout } = useAuthContext();

  return (
    <section className="logout_container container">
      <h2>User</h2>
      <button className="profile">My profile</button>
      <button className="orders">My orders</button>
      <button className="logout" onClick={logout}>
        Logout
      </button>
    </section>
  );
};
