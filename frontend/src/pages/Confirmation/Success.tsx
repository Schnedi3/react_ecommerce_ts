import { useNavigate } from "react-router-dom";

import { iconConfirm } from "../../Routes";
import "./confirmation.css";
import "../globals.css";

export const Success = () => {
  const navigate = useNavigate();

  return (
    <section className="confirm_container container">
      <img src={iconConfirm} alt="order confirmed" />
      <h2>Order confirmed</h2>
      <article className="thanks">
        <p>Thank you for your order</p>
        <p>Your payment will be processed on delivery!</p>
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
