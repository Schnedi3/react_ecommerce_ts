import "../css/menu.css";
import mobileMenu from "../assets/mobile_menu.svg";

import { Link } from "react-router-dom";
import { CartWidget } from "./CartWidget";
import { useEffect, useState } from "react";

export const Menu = () => {
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
    <nav className="menu">
      <div className="menu__container">
        <Link to="/" className="menu__logo">
          LOGO
        </Link>
        <img
          className="mobile__menu"
          src={mobileMenu}
          alt="mobile menu icon"
          id={isMenuOpen ? "mobile__menu-rotate" : ""}
          onClick={toggleMenu}
        />
        <ul className="menu__links" id={isMenuOpen ? "menu__links-visible" : ""}>
          <li>
            <Link to="/" onClick={closeMenu}>Home</Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu}>Contact</Link>
          </li>
          <li>
            <Link to="/login" onClick={closeMenu}>Login</Link>
          </li>
        </ul>
        <CartWidget />
      </div>
    </nav>
  );
};
