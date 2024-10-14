import { iconLink } from "../../Routes";
import styles from "./notfound.module.css";

export const NotFound = () => {
  return (
    <section className={styles.found}>
      <h2 className={styles.title}>404 | Page not found</h2>
      <img className={styles.link} src={iconLink} alt="link icon" />
    </section>
  );
};
