import { Link } from "react-router-dom";

import { useAuthContext } from "../../context/useAuthContext";
import { iconBox, iconLogin, iconModal } from "../../Routes";
import "./logout.css";
import "../globals.css";

export const Logout = () => {
  const { logout } = useAuthContext();

  return (
    <section className="logout_container container">
      <h2>User</h2>
      <Link className="profile" to={"/profile"}>
        <img src={iconLogin} />
        <p>My account</p>
        <img src={iconModal} />
      </Link>
      <Link className="orders" to={"/orders"}>
        <img src={iconBox} />
        <p>My orders</p>
        <img src={iconModal} />
      </Link>
      <button className="dark_button dark_button-logout" onClick={logout}>
        Logout
      </button>
    </section>
  );
};
