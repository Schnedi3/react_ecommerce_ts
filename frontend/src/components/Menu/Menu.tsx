import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { useShopContext } from "../../context/useShopContext";

import { iconCart, iconClose, iconLogin, iconMenu } from "../../Routes";
import "./menu.css";

export const Menu = () => {
  const { itemsInCart } = useShopContext();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    window.addEventListener("resize", closeMenu);

    return () => {
      window.removeEventListener("resize", closeMenu);
    };
  }, []);

  return (
    <nav className="menu container">
      <Link to="/" className="menu_logo">
        Shopify
      </Link>
      <ul className={`menu_links${isMenuOpen ? " menu_links-visible" : ""}`}>
        <img
          className="close_menu"
          onClick={closeMenu}
          src={iconClose}
          alt="close menu"
        />
        <li>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>
        </li>
      </ul>
      <article>
        <Link className="menu_user" to="/user">
          <img src={iconLogin} alt="login icon" />
        </Link>
        <Link className="menu_cart" to="/cart">
          <img src={iconCart} alt="cart icon" />
          <span>{itemsInCart}</span>
        </Link>
        <img
          className="mobile_menu"
          src={iconMenu}
          alt="mobile menu icon"
          onClick={toggleMenu}
        />
      </article>
    </nav>
  );
};
