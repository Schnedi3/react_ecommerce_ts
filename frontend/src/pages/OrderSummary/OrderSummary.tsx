import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

import { useShopContext } from "../../context/useShopContext";
import { formatCurrency } from "../../helpers/formatCurrency";
import {
  createCheckoutSessionRequest,
  AddressModal,
  iconAddress,
  addOrderRequest,
} from "../../Routes";
import { imagesURL } from "../config";
import styles from "./summary.module.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const OrderSummary = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [shippingAddress, setShippingAddress] = useState<number>(0);
  const { getCart } = useShopContext();
  const navigate = useNavigate();

  const {
    cart,
    totalAmount,
    getAddress,
    addressList,
    isModalAddress,
    setIsModalAddress,
  } = useShopContext();

  useEffect(() => {
    getAddress();
  }, [getAddress]);

  const handleStripeCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const response = await createCheckoutSessionRequest(
        cart,
        shippingAddress,
        totalAmount,
        paymentMethod
      );

      if (response.data.success) {
        stripe &&
          (await stripe.redirectToCheckout({ sessionId: response.data.id }));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Failed to redirect to Stripe Checkout");
    }
  };

  const handleCodCheckout = async () => {
    try {
      const response = await addOrderRequest(
        shippingAddress,
        totalAmount,
        paymentMethod
      );

      if (response.data.success) {
        getCart();
        navigate("/success");
      } else {
        toast.error(response.data.message);
        navigate("/cart");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  return (
    <section className={styles.order}>
      <article className={styles.cart}>
        <h2 className="title">Summary</h2>
        {cart.map((item, index) => (
          <div className={styles.product} key={index}>
            <img
              className={styles.productImage}
              src={`${imagesURL}/${item.images[0]}`}
              alt={item.title}
            />
            <h3>{item.title}</h3>
            <p>{item.quantity}</p>
            <p>{item.size}</p>
            <p>{formatCurrency(item.price)}</p>
          </div>
        ))}

        <div className={styles.total}>
          <p className={styles.shipping}>
            Shipping <span>Free</span>
          </p>
          <h3 className={styles.totalAmount}>
            Total <span>{formatCurrency(totalAmount)}</span>
          </h3>
        </div>
      </article>

      <article className={styles.payment}>
        <h2 className="title">Payment method</h2>
        <div className={styles.paymentInfo}>
          <label className={styles.paymentLabel}>
            <input
              className={styles.paymentRadio}
              type="radio"
              name="paymentMethod"
              onChange={() => setPaymentMethod("stripe")}
            />
            Stripe
          </label>
          <label className={styles.paymentLabel}>
            <input
              className={styles.paymentRadio}
              type="radio"
              name="paymentMethod"
              value="cod"
              onChange={() => setPaymentMethod("cod")}
            />
            Cash on delivery
          </label>
        </div>
      </article>

      <article className={styles.addresses}>
        <h2 className="title">Delivery address</h2>
        <div className={styles.addressInfo}>
          {addressList.map((address) => (
            <label className={styles.addressLabel} key={address.first_name}>
              <input
                className={styles.addressRadio}
                type="radio"
                name="address"
                onChange={() => setShippingAddress(address.id)}
              />
              <h4 className={styles.name}>
                {address.first_name} {address.last_name}
              </h4>
              <p>
                {address.street}, {address.number}
              </p>
              <p>{address.door}</p>
              <p>{address.city}</p>
              <p>
                {address.state}, {address.zip_code}
              </p>
              <p>
                <span className={styles.span}>Phone number:</span>{" "}
                {address.phone}
              </p>
            </label>
          ))}
        </div>
      </article>

      <button
        className={styles.addAddress}
        onClick={() => setIsModalAddress(true)}
      >
        <img
          className={styles.addAddressIcon}
          src={iconAddress}
          alt="add new address"
        />
        Add new address
      </button>

      {isModalAddress && <AddressModal getAddress={getAddress} />}

      <button
        className="dark_button"
        id={
          paymentMethod === "" || shippingAddress === 0
            ? "dark_button-disabled"
            : ""
        }
        onClick={
          paymentMethod === "cod" ? handleCodCheckout : handleStripeCheckout
        }
      >
        {paymentMethod === "cod" ? "Place order" : "Go to Checkout"}
      </button>
    </section>
  );
};
