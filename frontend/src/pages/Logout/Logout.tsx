import { Link } from "react-router-dom";

import { useAuthContext } from "../../context/useAuthContext";
import { iconArrow, iconBox, iconLogin, Title } from "../../Routes";
import styles from "./logout.module.css";

export const Logout = () => {
  const { logout } = useAuthContext();

  return (
    <section className={styles.logout}>
      <Title title="User" />
      <Link className={styles.link} to={"/profile"}>
        <img className={styles.userIcon} src={iconLogin} />
        <p>My account</p>
        <img className={styles.iconArrow} src={iconArrow} />
      </Link>
      <Link className={styles.link} to={"/orders"}>
        <img className={styles.userIcon} src={iconBox} />
        <p>My orders</p>
        <img className={styles.iconArrow} src={iconArrow} />
      </Link>
      <button
        className={`dark_button ${styles.darkButtonLogout}`}
        onClick={logout}
      >
        Logout
      </button>
    </section>
  );
};
