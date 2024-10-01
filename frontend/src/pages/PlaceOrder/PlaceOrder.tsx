import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useCartContext } from "../../context/useCartContext";
import { useAddress } from "../../hooks/useAddress";
import { addOrderRequest } from "../../api/order";
import "./place_order.css";
import "../globals.css";

export const PlaceOrder = () => {
  const [orderPayment, setOrderPayment] = useState<string>("");
  const [orderAddress, setOrderAddress] = useState<number>(0);
  const { cart, deleteProduct, totalAmount } = useCartContext();
  const { register, handleSubmit, errors, addresses, onSubmit } = useAddress();
  const navigate = useNavigate();

  const addOrder = async () => {
    try {
      if (!orderAddress) toast.error("Select a payment method first");
      if (!orderPayment) toast.error("Select an address first");

      const response = await addOrderRequest(
        orderAddress,
        totalAmount,
        orderPayment
      );

      if (response.data.success) {
        toast.success(response.data.message);
        if (response.data.result.payment_method === "stripe") {
          navigate("/payment");
        } else {
          navigate("/orders");
        }
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

  const handleAddOrder = () => {
    addOrder();
    cart.map((item) => {
      deleteProduct(item.product_id, item.size);
    });
    setOrderPayment("");
    setOrderAddress(0);
  };

  return (
    <section className="place_order container">
      <article className="cart_summary">
        <h2>Summary</h2>
        {cart.map((item, index) => (
          <div className="product" key={index}>
            <img src={item.images[0]} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.quantity}</p>
            <p>{item.size}</p>
            <p>${item.price}</p>
          </div>
        ))}

        <div className="total">
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
      </article>

      <article className="payment">
        <h2>Payment method</h2>
        <div>
          <label>
            <input
              type="radio"
              name="payment_method"
              onChange={() => setOrderPayment("stripe")}
            />
            Stripe
          </label>
          <label>
            <input
              type="radio"
              name="payment_method"
              onChange={() => setOrderPayment("cod")}
            />
            Cash on delivery
          </label>
        </div>
      </article>

      <article className="addresses">
        {addresses.length !== 0 ? (
          <div className="address">
            <h2>Your addresses</h2>
            {addresses.map((address) => (
              <label className="label" key={address.first_name}>
                <input
                  type="radio"
                  className="radio"
                  name="address"
                  onChange={() => setOrderAddress(address.id)}
                />
                <h4>
                  {address.first_name} {address.last_name}
                </h4>
                <p>
                  {address.street}, {address.number}
                </p>
                <p>{address.door}</p>
                <p>{address.city}</p>
                <p>{address.state}</p>
                <p>{address.zip_code}</p>
                <p>{address.phone}</p>
              </label>
            ))}
          </div>
        ) : (
          <form
            className="address_form"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2>Add address</h2>

            <article>
              <label>
                First name
                {errors.first_name && (
                  <span className="error">{errors.first_name.message}</span>
                )}
                <input
                  type="text"
                  className={errors.first_name ? "input_error" : ""}
                  placeholder="John"
                  {...register("first_name")}
                />
              </label>
              <label>
                Last name
                {errors.last_name && (
                  <span className="error">{errors.last_name.message}</span>
                )}
                <input
                  type="text"
                  className={errors.last_name ? "input_error" : ""}
                  placeholder="Doe"
                  {...register("last_name")}
                />
              </label>
            </article>

            <article>
              <label>
                Phone
                {errors.phone && (
                  <span className="error">{errors.phone.message}</span>
                )}
                <input
                  type="tel"
                  className={errors.phone ? "input_error" : ""}
                  placeholder="678 901 234"
                  {...register("phone")}
                />
              </label>
            </article>

            <article>
              <label>
                Street
                {errors.street && (
                  <span className="error">{errors.street.message}</span>
                )}
                <input
                  type="text"
                  className={errors.street ? "input_error" : ""}
                  placeholder="Fake St"
                  {...register("street")}
                />
              </label>
              <label>
                Number
                {errors.number && (
                  <span className="error">{errors.number.message}</span>
                )}
                <input
                  type="text"
                  className={errors.number ? "input_error" : ""}
                  placeholder="123"
                  {...register("number")}
                />
              </label>
              <label>
                Door
                {errors.door && (
                  <span className="error">{errors.door.message}</span>
                )}
                <input
                  type="text"
                  className={errors.door ? "input_error" : ""}
                  placeholder="3A"
                  {...register("door")}
                />
              </label>
            </article>

            <article>
              <label>
                City
                {errors.city && (
                  <span className="error">{errors.city.message}</span>
                )}
                <input
                  type="text"
                  className={errors.city ? "input_error" : ""}
                  placeholder="Pernambuco"
                  {...register("city")}
                />
              </label>
              <label>
                State
                {errors.state && (
                  <span className="error">{errors.state.message}</span>
                )}
                <input
                  type="text"
                  className={errors.state ? "input_error" : ""}
                  placeholder="FakeState"
                  {...register("state")}
                />
              </label>
              <label>
                Zip code
                {errors.zip_code && (
                  <span className="error">{errors.zip_code.message}</span>
                )}
                <input
                  type="text"
                  className={errors.zip_code ? "input_error" : ""}
                  placeholder="12345"
                  {...register("zip_code")}
                />
              </label>
            </article>

            <button className="dark_button dark_button-address" type="submit">
              Save Address
            </button>
          </form>
        )}
      </article>

      <button className="dark_button" onClick={handleAddOrder}>
        Place order
      </button>
    </section>
  );
};
