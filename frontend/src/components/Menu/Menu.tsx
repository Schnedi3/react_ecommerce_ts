import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";
import { useCart } from "../../api/cart";
import { iconCart, iconClose, iconLogin, iconMenu } from "../../Routes";
import { Modal } from "./Modal";
import { IProduct } from "../../types/types";
import styles from "./menu.module.css";

export const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { isAuthenticated } = useAuthStore();
  const { data: cart } = useCart();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    window.addEventListener("resize", closeMenu);

    return () => {
      window.removeEventListener("resize", closeMenu);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const itemsInCart = cart?.reduce(
    (acc: number, item: IProduct) => acc + item.quantity,
    0
  );

  return (
    <nav className={styles.menu}>
      <Link to="/" className={styles.menuTitle}>
        Shopify
      </Link>

      <ul
        className={`${styles.menuLinks} ${
          isMenuOpen ? styles.menuLinksVisible : ""
        }`}
      >
        <img
          className={styles.menuIconClose}
          onClick={closeMenu}
          src={iconClose}
          alt="close menu"
        />
        <li>
          <NavLink className={styles.menuLink} to="/" onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={styles.menuLink}
            to="/contact"
            onClick={closeMenu}
          >
            Contact
          </NavLink>
        </li>
      </ul>

      <article className={styles.menuUserCart}>
        {!isAuthenticated ? (
          <Link to="/login">
            <img
              className={styles.menuIconUser}
              src={iconLogin}
              alt="login icon"
            />
          </Link>
        ) : (
          <Modal />
        )}
        <Link className={styles.menuCart} to="/cart">
          <img className={styles.menuIconCart} src={iconCart} alt="cart icon" />
          <span className={styles.menuBadge}>{cart ? itemsInCart : 0}</span>
        </Link>
        <img
          className={styles.mobileMenuIcon}
          src={iconMenu}
          alt="mobile menu icon"
          onClick={toggleMenu}
        />
      </article>

      {isMenuOpen && (
        <span
          className={`${styles.menuBackdrop} ${
            isMenuOpen ? styles.menuBackdropVisible : ""
          }`}
          onClick={closeMenu}
        ></span>
      )}
    </nav>
  );
};
