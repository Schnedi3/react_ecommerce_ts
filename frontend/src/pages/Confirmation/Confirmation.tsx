import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useShopContext } from "../../context/useShopContext";
import {
  addStripeOrderRequest,
  fetchCheckoutSessionRequest,
  iconConfirm,
} from "../../Routes";

import "./confirmation.css";
import "../globals.css";

export const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const { getCart } = useShopContext();

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
