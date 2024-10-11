import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useShopContext } from "../../context/useShopContext";
import {
  addStripeOrderRequest,
  fetchCheckoutSessionRequest,
  iconConfirm,
} from "../../Routes";
import styles from "./confirmation.module.css";

export const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const { getCart } = useShopContext();

  console.log("sessionId from confirmation", sessionId);

  useEffect(() => {
    const getSessionDetails = async () => {
      if (!sessionId) {
        toast.error("No session ID found. Redirecting");
        navigate("/cart");
        return;
      }

      try {
        const response = await fetchCheckoutSessionRequest(sessionId);

        if (response.data.payment_status === "paid") {
          const { addressId, amount, paymentMethod } = response.data.metadata;
          const res = await addStripeOrderRequest(
            addressId,
            amount,
            paymentMethod,
            sessionId
          );

          if (res.data.success) {
            getCart();
          } else {
            toast.error(res.data.message);
            navigate("/cart");
          }
        } else {
          toast.error("Payment failed. Please try again");
          navigate("/cart");
        }
      } catch (error) {
        console.error("Error fetching checkout session:", error);
        toast.error("Failed to retrieve payment session. Redirecting");
        navigate("/cart");
      }
    };

    getSessionDetails();
  }, [sessionId, navigate, getCart]);

  return (
    <section className={styles.confirm}>
      <img
        className={styles.confirmIcon}
        src={iconConfirm}
        alt="order confirmed"
      />
      <h2 className="title">Order confirmed</h2>
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
