import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { contactSchema } from "../../schemas/schemas";
import { IContact } from "../../types/types";
import { Title } from "../../Routes";
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
        <label className={styles.label}>
          Name
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
          <input
            type="text"
            className={`${styles.input} ${
              errors.name ? styles.inputError : ""
            }`}
            placeholder="John Doe"
            {...register("name")}
          />
        </label>

        <label className={styles.label}>
          Email
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
          <input
            type="email"
            className={`${styles.input} ${
              errors.email ? styles.inputError : ""
            }`}
            placeholder="johndoe@lorem.com"
            {...register("email")}
          />
        </label>

        <label className={styles.label}>
          Message
          {errors.message && (
            <span className={styles.error}>{errors.message.message}</span>
          )}
          <textarea
            className={`${styles.input} ${
              errors.message ? styles.inputError : ""
            }`}
            rows={3}
            placeholder="lorem ipsum..."
            {...register("message")}
          ></textarea>
        </label>

        <button className="dark_button" type="submit">
          Send
        </button>
      </form>
    </section>
  );
};
