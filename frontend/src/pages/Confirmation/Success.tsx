import { useNavigate } from "react-router-dom";

import { iconConfirm } from "../../Routes";
import styles from "./confirmation.module.css";

export const Success = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.confirm}>
      <img
        className={styles.confirmIcon}
        src={iconConfirm}
        alt="order confirmed"
      />
      <h2>Order confirmed</h2>
      <article className={styles.thanks}>
        <p className={styles.thanksText}>Thank you for your order</p>
        <p className={styles.thanksText}>
          Your payment will be processed on delivery!
        </p>
      </article>
      <article className={styles.buttons}>
        <button className="dark_button" onClick={() => navigate("/")}>
          Continue shopping
        </button>
        <button className="dark_button" onClick={() => navigate("/orders")}>
          Go to orders
        </button>
      </article>
    </section>
  );
};
