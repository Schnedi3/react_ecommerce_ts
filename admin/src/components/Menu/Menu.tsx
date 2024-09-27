import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useAuthContext } from "../../context/useAuthContext";
import { iconClose, iconMenu } from "../../UIIcons";
import "./menu.css";

export const Menu = () => {
  const { isAuthenticated, logout } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    window.addEventListener("resize", closeMenu);

    return () => {
      window.removeEventListener("resize", closeMenu);
    };
  }, []);

  return (
    isAuthenticated && (
      <nav className="menu container">
        <article className="menu_logo">
          <h2>Shopify</h2>
          <h3>admin panel</h3>
        </article>

        <img
          className="open_menu"
          src={iconMenu}
          alt="menu icon"
          onClick={openMenu}
        />

        <ul className={`menu_links${isMenuOpen ? " menu_links-visible" : ""}`}>
          <img
            className="close_menu"
            onClick={closeMenu}
            src={iconClose}
            alt="close menu"
          />
          <li>
            <NavLink to="/" onClick={closeMenu}>
              New Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" onClick={closeMenu}>
              Manage Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" onClick={closeMenu}>
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" onClick={closeMenu}>
              Manage Users
            </NavLink>
          </li>
          <li>
            <p onClick={logout}>Logout</p>
          </li>
        </ul>
      </nav>
    )
  );
};
