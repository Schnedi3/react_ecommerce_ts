import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import "./logout.css";

import { iconBox, iconLogin, iconModal } from "../../UIIcons";

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
      <Link className="orders" to={"/"}>
        <img src={iconBox} />
        <p>My orders</p>
        <img src={iconModal} />
      </Link>
      <button className="logout" onClick={logout}>
        Logout
      </button>
    </section>
  );
};
