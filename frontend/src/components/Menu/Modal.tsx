import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useAuthContext } from "../../context/useAuthContext";
import { iconLogin } from "../../Routes";
import styles from "./modal.module.css";

export const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);
  const { logout } = useAuthContext();

  useEffect(() => {
    window.addEventListener("resize", closeModal);

    return () => {
      window.removeEventListener("resize", closeModal);
    };
  }, []);

  return (
    <section>
      <button className={styles.menuUser} onClick={toggleModal}>
        <img className={styles.menuIconUser} src={iconLogin} alt="login icon" />
      </button>

      <ul className={`${styles.modal} ${isModalOpen ? styles.modalOpen : ""}`}>
        <NavLink
          className={styles.modalItem}
          to={"/profile"}
          onClick={closeModal}
        >
          Profile
        </NavLink>
        <NavLink
          className={styles.modalItem}
          to={"/orders"}
          onClick={closeModal}
        >
          Orders
        </NavLink>
        <p className={styles.modalItem} onClick={logout}>
          Logout
        </p>
      </ul>
    </section>
  );
};
