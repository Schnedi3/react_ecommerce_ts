import { useState } from "react";
import { toast } from "react-toastify";

import { useAuthContext } from "../../context/useAuthContext";
import { useAddress } from "../../hooks/useAddress";
import { removeAddresstRequest } from "../../api/address";
import { iconAdd } from "../../UIIcons";
import "./profile.css";
import "../globals.css";

export const Profile = () => {
  const { user } = useAuthContext();
  const { register, handleSubmit, errors, addresses, setAddresses, onSubmit } =
    useAddress();
  const [visibleAdd, setVisibleAdd] = useState<boolean>(false);
  const [visibleRemove, setVisibleRemove] = useState<boolean>(false);

  const removeAddress = async (id: number) => {
    try {
      const response = await removeAddresstRequest(id);

      if (response.data.success) {
        setAddresses(addresses.filter((address) => address.id !== id));
        setVisibleRemove(false);
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

      {addresses.length !== 0 && (
        <>
          <article className="address_container">
            <h2>Addresses</h2>

            <div className="crud">
              <button onClick={() => setVisibleAdd(!visibleAdd)}>
                <img className="add" src={iconAdd} alt="add address" />
              </button>
              <button onClick={() => setVisibleRemove(!visibleRemove)}>
                <img className="remove" src={iconAdd} alt="remove address" />
              </button>
            </div>

            <div className="profile_address">
              {addresses.map((address) => (
                <label key={address.address_line1}>
                  <input type="radio" />
                  {visibleRemove && (
                    <button onClick={() => removeAddress(address.id)}>
                      <img src={iconAdd} alt="remove address" />
                    </button>
                  )}
                  <p>{address.address_line1}</p>
                  <p>{address.address_line2}</p>
                  <p>{address.city}</p>
                  <p>{address.state}</p>
                  <p>{address.zip_code}</p>
                  <p>{address.phone}</p>
                </label>
              ))}
            </div>
          </article>

          {visibleAdd && (
            <form
              className="personal_form"
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h2>New address</h2>
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
                    <span className="error">
                      {errors.address_line2.message}
                    </span>
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
          )}
        </>
      )}
    </section>
  );
};
