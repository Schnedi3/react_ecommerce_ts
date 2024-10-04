import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  addOrderRequest,
  fetchCheckoutSessionRequest,
  iconConfirm,
} from "../../Routes";

import "./confirmation.css";
import "../globals.css";

export const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionId = new URLSearchParams(location.search).get("session_id");

  useEffect(() => {
    const getSessionDetails = async () => {
      if (!sessionId) {
        toast.error("No session ID found. Redirecting to home");
        navigate("/");
        return;
      }

      try {
        const response = await fetchCheckoutSessionRequest(sessionId);

        if (response.data.payment_status === "paid") {
          const { address_id, amount, payment_method } = response.data.metadata;
          const res = await addOrderRequest(address_id, amount, payment_method);

          if (!res.data.success) {
            toast.error(response.data.message);
          }
        } else {
          toast.error("Payment failed. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching checkout session:", error);
        toast.error("Failed to retrieve payment session. Redirecting to home");
        navigate("/");
      }
    };

    getSessionDetails();
  }, [sessionId, navigate]);

  return (
    <section className="confirm_container container">
      <img src={iconConfirm} alt="order confirmed" />
      <h2>Order confirmed</h2>
      <article className="thanks">
        <p>Thank you for your order</p>
        <p>Your payment was processed successfully!</p>
      </article>
      <article className="buttons">
        <button
          className="dark_button dark_button-shop"
          onClick={() => navigate("/")}
        >
          Continue shopping
        </button>
        <button
          className="dark_button dark_button-order"
          onClick={() => navigate("/orders")}
        >
          Go to orders
        </button>
      </article>
    </section>
  );
};
