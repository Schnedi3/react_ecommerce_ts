import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAddAddress } from "../../api/address";
import { Button, iconClose, Title } from "../../Routes";
import { IAddress } from "../../types/types";
import { addressSchema } from "../../schemas/schemas";
import styles from "./address.module.css";

interface IAddressProps {
  isAddAddress: boolean;
  setIsAddAddress: (isAddAddress: boolean) => void;
}

export const AddressModal = ({
  isAddAddress,
  setIsAddAddress,
}: IAddressProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAddress>({
    resolver: zodResolver(addressSchema),
  });
  const { mutate: addAddress } = useAddAddress();

  const onSubmit = async (address: IAddress) => {
    addAddress(address),
      {
        onSuccess: () => {
          setIsAddAddress(false);
          reset();
        },
      };
  };

  useEffect(() => {
    if (isAddAddress) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isAddAddress]);

  return (
    <section className={styles.modal}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <button
          className={styles.closeModal}
          onClick={() => setIsAddAddress(false)}
        >
          <img className={styles.closeIcon} src={iconClose} alt="close modal" />
        </button>

        <Title title="Add address" />

        <article className={styles.article}>
          <div className={styles.label}>
            {errors.first_name && (
              <span className={styles.error}>{errors.first_name.message}</span>
            )}
            <input
              className={`${styles.input} ${
                errors.first_name ? styles.inputError : ""
              }`}
              id="first_name"
              type="text"
              placeholder=""
              {...register("first_name")}
            />
            <label htmlFor="first_name">First name</label>
          </div>
          <div className={styles.label}>
            {errors.last_name && (
              <span className={styles.error}>{errors.last_name.message}</span>
            )}
            <input
              className={`${styles.input} ${
                errors.last_name ? styles.inputError : ""
              }`}
              id="last_name"
              type="text"
              placeholder=""
              {...register("last_name")}
            />
            <label htmlFor="last_name">Last name</label>
          </div>
        </article>

        <article className={styles.article}>
          <div className={styles.label}>
            {errors.phone && (
              <span className={styles.error}>{errors.phone.message}</span>
            )}
            <input
              className={`${styles.input} ${
                errors.phone ? styles.inputError : ""
              }`}
              id="phone"
              type="tel"
              placeholder=""
              {...register("phone")}
            />
            <label htmlFor="phone">Phone</label>
          </div>
        </article>

        <article className={styles.article}>
          <div className={styles.label}>
            {errors.street && (
              <span className={styles.error}>{errors.street.message}</span>
            )}
            <input
              className={`${styles.input} ${
                errors.street ? styles.inputError : ""
              }`}
              id="street"
              type="text"
              placeholder=""
              {...register("street")}
            />
            <label htmlFor="street">Street</label>
          </div>
          <div className={styles.label}>
            {errors.number && (
              <span className={styles.error}>{errors.number.message}</span>
            )}
            <input
              className={`${styles.input} ${
                errors.number ? styles.inputError : ""
              }`}
              id="number"
              type="text"
              placeholder=""
              {...register("number")}
            />
            <label htmlFor="number">Number</label>
          </div>
        </article>

        <article className={styles.article}>
          <div className={styles.label}>
            {errors.door && (
              <span className={styles.error}>{errors.door.message}</span>
            )}
            <input
              className={`${styles.input} ${
                errors.door ? styles.inputError : ""
              }`}
              id="door"
              type="text"
              placeholder=""
              {...register("door")}
            />
            <label htmlFor="door">Door</label>
          </div>
          <div className={styles.label}>
            {errors.city && (
              <span className={styles.error}>{errors.city.message}</span>
            )}
            <input
              className={`${styles.input} ${
                errors.city ? styles.inputError : ""
              }`}
              id="city"
              type="text"
              placeholder=""
              {...register("city")}
            />
            <label htmlFor="city">City</label>
          </div>
        </article>

        <article className={styles.article}>
          <div className={styles.label}>
            {errors.state && (
              <span className={styles.error}>{errors.state.message}</span>
            )}
            <input
              className={`${styles.input} ${
                errors.state ? styles.inputError : ""
              }`}
              id="state"
              type="text"
              placeholder=""
              {...register("state")}
            />
            <label htmlFor="state">State</label>
          </div>
          <div className={styles.label}>
            {errors.zip_code && (
              <span className={styles.error}>{errors.zip_code.message}</span>
            )}
            <input
              className={`${styles.input} ${
                errors.zip_code ? styles.inputError : ""
              }`}
              id="zip_code"
              type="text"
              inputMode="numeric"
              pattern="[0-9]"
              placeholder=""
              {...register("zip_code")}
            />
            <label htmlFor="zip_code">Zip code</label>
          </div>
        </article>

        <Button type="submit" text="Save Address" />
      </form>
    </section>
  );
};
