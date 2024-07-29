import "../css/menu.css";
import Logo from "../assets/logo.svg";

import { Link } from "react-router-dom";
import { CartWidget } from "./CartWidget";
import { Login } from "./Login";

export const Menu = () => {
  return (
    <nav className="menu">
      <div className="menu__container">
        <Link to="/" className="menu__logo">
          <img src={Logo} alt="logo" />
        </Link>
        <div className="menu__links">
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
          <CartWidget />
          <Login />
        </div>
      </div>
    </nav>
  );
};
