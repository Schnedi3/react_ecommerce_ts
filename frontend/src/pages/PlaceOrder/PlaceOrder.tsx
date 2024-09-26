import { useCartContext } from "../../context/useCartContext";
import { useAddress } from "../../hooks/useAddress";
import "./place_order.css";

export const PlaceOrder = () => {
  const { cart, totalAmount } = useCartContext();
  const { register, handleSubmit, errors, addresses, setUseAddress, onSubmit } =
    useAddress();

  return (
    <section className="place_order container">
      <article>
        <h2>Your addresses</h2>
        {addresses.length === 0 ? (
          <p>No addresses found</p>
        ) : (
          <div className="address">
            {addresses.map((address) => (
              <label className="label" key={address.address_line1}>
                <input
                  type="radio"
                  className="radio"
                  name="address"
                  onChange={() => setUseAddress(address)}
                />
                <p>{address.address_line1}</p>
                <p>{address.address_line2}</p>
                <p>{address.city}</p>
                <p>{address.state}</p>
                <p>{address.zip_code}</p>
                <p>{address.phone}</p>
              </label>
            ))}
          </div>
        )}

        <form
          className="address_form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2>Delivery information</h2>
          <label>
            Street
            {errors.address_line1 && (
              <span className="error">{errors.address_line1.message}</span>
            )}
            <input
              type="text"
              id="street"
              placeholder="Gran via 69"
              {...register("address_line1")}
            />
          </label>

          <article>
            <label>
              Door
              {errors.address_line2 && (
                <span className="error">{errors.address_line2.message}</span>
              )}
              <input
                type="text"
                id="door"
                placeholder="3D"
                {...register("address_line2")}
              />
            </label>
            <label>
              City
              {errors.city && (
                <span className="error">{errors.city.message}</span>
              )}
              <input
                type="text"
                id="city"
                placeholder="Madrid"
                {...register("city")}
              />
            </label>
          </article>

          <article>
            <label>
              State
              {errors.state && (
                <span className="error">{errors.state.message}</span>
              )}
              <input
                type="text"
                id="state"
                placeholder="Madrid"
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
                id="zip"
                placeholder="12345"
                {...register("zip_code")}
              />
            </label>
          </article>

          <label>
            Phone
            {errors.phone && (
              <span className="error">{errors.phone.message}</span>
            )}
            <input
              type="tel"
              id="phone"
              placeholder="678 901 234"
              {...register("phone")}
            />
          </label>

          <button type="submit">Save Address</button>
        </form>
      </article>

      <article className="order_summary">
        <div className="cart_summary">
          <h2>Summary</h2>
          {cart.map((item) => (
            <div className="product" key={item.product_id}>
              <img src={item.images[0]} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>
                  <span>${item.price}</span> x {item.quantity}
                </p>
              </div>
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
        </div>

        <button>proceed to pay</button>
      </article>
    </section>
  );
};
