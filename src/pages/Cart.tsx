import { useCartContext } from "../context/useCartContext";
import "../css/cart.css";

export const Cart = () => {
  const { cart, decreaseQuantity, increaseQuantity, deleteProduct, totalCart } =
    useCartContext();

  return cart.length === 0 ? (
    <p className="cart__empty">Your cart is empty...</p>
  ) : (
    <main className="cart__container">
      <section className="cart__header">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </section>

      {cart.map((item) => (
        <section className="item__info" key={item.id}>
          <img src={item.thumbnail} alt={item.title} />
          <p className="item__title">{item.title}</p>
          <p>${item.price}</p>
          <div className="quantity__info">
            <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <p>{item.quantity}</p>
            <button onClick={() => increaseQuantity(item.id)}>+</button>
          </div>
          <p>${(item.quantity * item.price).toFixed(2)}</p>
          <button onClick={() => deleteProduct(item.id)}>✖</button>
        </section>
      ))}

      <section className="cart__total">
        <h2>Cart total</h2>
        <div className="total__info">
          <p>
            Subtotal <span>${totalCart().toFixed(2)}</span>
          </p>
          <p>
            Shipping fee <span>Free</span>
          </p>
          <h3>
            Total <span>${totalCart().toFixed(2)}</span>
          </h3>
        </div>
      </section>
      <button className="cart__pay">proceed to checkout</button>
    </main>
  );
};
