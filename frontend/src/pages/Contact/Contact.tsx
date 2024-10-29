import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { contactSchema } from "../../schemas/schemas";
import { IContact } from "../../types/types";
import { Button, Title } from "../../Routes";
import styles from "./contact.module.css";

export const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IContact>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: IContact) => {
    console.log(data);
    reset();
  };

  return (
    <section className={styles.contact}>
      <Title title="Get in touch" />

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <article className={styles.label}>
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
          <input
            className={`${styles.input} ${
              errors.name ? styles.inputError : ""
            }`}
            id="name"
            type="text"
            placeholder=""
            {...register("name")}
          />
          <label htmlFor="name">Name</label>
        </article>

        <article className={styles.label}>
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
          <input
            className={`${styles.input} ${
              errors.email ? styles.inputError : ""
            }`}
            id="email"
            type="email"
            placeholder=""
            {...register("email")}
          />
          <label htmlFor="email">Email</label>
        </article>

        <article className={styles.label}>
          {errors.message && (
            <span className={styles.error}>{errors.message.message}</span>
          )}
          <textarea
            className={`${styles.input} ${
              errors.message ? styles.inputError : ""
            }`}
            id="message"
            rows={3}
            placeholder=""
            {...register("message")}
          ></textarea>
          <label htmlFor="message">Message</label>
        </article>

        <Button type="submit" text="Send" />
      </form>
    </section>
  );
};
