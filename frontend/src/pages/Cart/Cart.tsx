import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useShopContext } from "../../context/useShopContext";
import { formatCurrency } from "../../helpers/formatCurrency";
import {
  deleteFromCartRequest,
  iconCart,
  iconDelete,
  updateCartRequest,
} from "../../Routes";

import "./cart.css";
import "../globals.css";

export const Cart = () => {
  const { cart, setCart, getCart, totalAmount } = useShopContext();
  const navigate = useNavigate();

  const updateQuantity = async (
    product_id: number,
    quantity: number,
    size: string
  ) => {
    try {
      const response = await updateCartRequest(product_id, quantity, size);

      if (response.data.success) {
        const updateItem = response.data.result;
        setCart(
          cart.map((item) => (item.id === product_id ? updateItem : item))
        );
        getCart();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const deleteProduct = async (product_id: number, size: string) => {
    try {
      const response = await deleteFromCartRequest(product_id, size);

      if (response.data.success) {
        setCart(cart.filter((item) => item.id !== product_id));
        getCart();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  if (cart.length === 0)
    return <img className="cart_empty" src={iconCart} alt="" />;

  return (
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
            <p>{formatCurrency(item.price)}</p>
            <img
              className="item_remove"
              src={iconDelete}
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
            Shipping <span>Free</span>
          </p>
          <h3>
            Total <span>{formatCurrency(totalAmount)}</span>
          </h3>
        </div>
        <button
          className="dark_button dark_button-pay"
          onClick={() => navigate("/order-summary")}
        >
          proceed to summary
        </button>
      </article>
    </section>
  );
};
