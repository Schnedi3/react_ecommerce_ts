import "../css/menu.css";
import imgCart from "../assets/cart.svg";

import { Link } from "react-router-dom";
import { useCartContext } from "../context/useCartContext";

export const CartWidget = () => {
  const { cart } = useCartContext();

  const quantityInCart = () => cart.length;

  return (
    <Link to="/cart" className="cart__img">
      <img src={imgCart} alt="cart image" />
      <div>
        <span>{quantityInCart()}</span>
      </div>
    </Link>
  );
};
