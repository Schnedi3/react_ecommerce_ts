import "../css/cart.css";
import imgPay from "../assets/pay.svg";

import { useCartContext } from "../context/useCartContext";

export const Cart = () => {
  const {
    cart,
    decreaseQuantity,
    increaseQuantity,
    deleteProduct,
    totalCart,
    emptyCart,
  } = useCartContext();

  return (
    <section className="aside__container">
      <article className="cart__info">
        {cart.length === 0 ? (
          <p>Your cart is empty...</p>
        ) : (
          <>
            {cart.map((item) => (
              <div className="item__info" key={item.id}>
                <h3>{item.title}</h3>
                <div className="quantity__info">
                  <p>Quantity:</p>
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <p className="item__quantity">{item.quantity}</p>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <p>
                  Unit price: <span>${item.price}</span>
                </p>
                <p>
                  Total: <span>${item.quantity * item.price}</span>
                </p>
                <button onClick={() => deleteProduct(item.id)}>
                  Remove item
                </button>
              </div>
            ))}
          </>
        )}
      </article>
      <aside className="pay__container">
        <div className="pay__info">
          <button onClick={emptyCart}>empty cart</button>
          <h2>
            cart total <span>${totalCart().toFixed(2)}</span>
          </h2>
          <img src={imgPay} alt="pay image" />
        </div>
      </aside>
    </section>
  );
};
