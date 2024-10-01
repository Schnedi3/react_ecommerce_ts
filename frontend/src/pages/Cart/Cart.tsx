import { useNavigate } from "react-router-dom";

import { useCartContext } from "../../context/useCartContext";
import { iconCart, iconRemove } from "../../UIIcons";
import "./cart.css";
import "../globals.css";

export const Cart = () => {
  const { cart, updateQuantity, deleteProduct, totalAmount } = useCartContext();
  const navigate = useNavigate();

  return cart.length === 0 ? (
    <img className="cart_empty" src={iconCart} alt="" />
  ) : (
    <section className="cart_container container">
      <article>
        <h2>Cart</h2>
        {cart.map((item, index) => (
          <div className="item_info" key={index}>
            <img className="item_photo" src={item.images[0]} alt={item.title} />
            <h3 className="item_title">{item.title}</h3>
            <input
              type="number"
              id="quantity"
              min={1}
              defaultValue={item.quantity}
              onChange={(e) =>
                updateQuantity(
                  item.product_id,
                  Number(e.target.value),
                  item.size
                )
              }
            />
            <p>{item.size}</p>
            <p>${item.price}</p>
            <img
              className="item_remove"
              src={iconRemove}
              alt="remove product"
              onClick={() => deleteProduct(item.product_id, item.size)}
            />
          </div>
        ))}
      </article>

      <article className="cart_total">
        <h2>Total</h2>
        <div className="total_info">
          <p>
            Subtotal <span>${totalAmount.toFixed(2)}</span>
          </p>
          <p>
            Shipping <span>Free</span>
          </p>
          <h3>
            Total <span>${totalAmount.toFixed(2)}</span>
          </h3>
        </div>
        <button
          className="dark_button dark_button-pay"
          onClick={() => navigate("/place-order")}
        >
          proceed to checkout
        </button>
      </article>
    </section>
  );
};
