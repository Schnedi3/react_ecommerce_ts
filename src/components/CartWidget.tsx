import { Link } from "react-router-dom";

import { useCartContext } from "../context/useCartContext";
import imgCart from "../assets/icons/cart.svg";
import "../css/menu.css";

export const CartWidget = () => {
  const { cart } = useCartContext();

  const quantityInCart = () => cart.length;

  return (
    <Link to="/cart" className="cart__img">
      <img src={imgCart} alt="cart image" />
      <span>{quantityInCart()}</span>
    </Link>
  );
};
