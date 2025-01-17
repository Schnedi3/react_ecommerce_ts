import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useFetchCheckoutSession } from "../../api/checkout";
import { useAddOrder } from "../../api/order";
import { iconConfirm, Title } from "../../Routes";
import styles from "./confirmation.module.css";

export const Confirmation = () => {
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const { data: session } = useFetchCheckoutSession(String(sessionId));
  const { mutate: addOrder } = useAddOrder();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId && session?.payment_status === "paid") {
      const { shippingAddress, totalAmount, paymentMethod } = session.metadata;
      addOrder({
        shippingAddress,
        totalAmount,
        paymentMethod,
        sessionId,
      });
    }
  }, [addOrder, sessionId, session]);

  return (
    <section className={styles.confirm}>
      <img
        className={styles.confirmIcon}
        src={iconConfirm}
        alt="order confirmed"
      />
      <Title title="Order confirmed" />
      <article className={styles.thanks}>
        <p className={styles.thanksText}>Thank you for your order</p>
        <p className={styles.thanksText}>
          Your payment was processed successfully!
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
