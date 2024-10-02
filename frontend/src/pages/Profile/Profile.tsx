import { toast } from "react-toastify";

import { useAuthContext } from "../../context/useAuthContext";
import { useAddress } from "../../hooks/useAddress";
import { removeAddressRequest } from "../../api/address";
import "./profile.css";
import "../globals.css";

export const Profile = () => {
  const { user } = useAuthContext();
  const { register, handleSubmit, errors, addresses, setAddresses, onSubmit } =
    useAddress();

  const removeAddress = async (id: number) => {
    try {
      const response = await removeAddressRequest(id);

      if (response.data.success) {
        setAddresses(addresses.filter((address) => address.id !== id));
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

  return (
    <section className="profile_container container">
      {user && (
        <article className="personal">
          <h2>Personal information</h2>
          <ul>
            <li>
              <h4>Username</h4>
              <p>{user.username}</p>
            </li>
            <li>
              <h4>Email</h4>
              <p>{user.email}</p>
            </li>
          </ul>
        </article>
      )}

      {addresses.length > 0 && (
        <article className="address_container">
          <h2>Your addresses</h2>

          <div className="profile_address">
            {addresses.map((address) => (
              <label key={address.first_name}>
                <input type="radio" />
                <h4>
                  {address.first_name} {address.last_name}
                </h4>
                <p>
                  {address.street}, {address.number} -
                </p>
                <p>{address.door}</p>
                <p>{address.city}</p>
                <p>
                  {address.state}, {address.zip_code}
                </p>
                <p>
                  <span>Phone number:</span> {address.phone}
                </p>

                <div>
                  <button onClick={() => removeAddress(address.id)}>
                    Delete
                  </button>
                </div>
              </label>
            ))}
          </div>
        </article>
      )}

      <form
        className="personal_form"
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
              type="number"
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
              type="number"
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
    </section>
  );
};
