import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useResetPassword } from "../../api/auth";
import { loginSchema } from "../../schemas/schemas";
import { IUser } from "../../types/types";
import { Button, iconEyeClosed, iconEyeOpen, Title } from "../../Routes";
import styles from "./auth.module.css";

export const ResetPassword = () => {
  const [visible, setIsVisible] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({
    resolver: zodResolver(loginSchema),
  });
  const { mutate: resetPassword } = useResetPassword();

  const onSubmit = (data: IUser) => {
    resetPassword(data);
    reset();
  };

  return (
    <section className={styles.auth}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Title title="Reset password" />

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
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
          <input
            className={`${styles.input} ${
              errors.password ? styles.inputError : ""
            }`}
            id="password"
            type={visible ? "text" : "password"}
            placeholder=""
            {...register("password")}
          />
          <label htmlFor="password">New password</label>
          <button
            className={styles.viewPassword}
            type="button"
            onClick={() => setIsVisible(!visible)}
          >
            <img
              className={styles.viewPasswordIcon}
              src={visible ? iconEyeClosed : iconEyeOpen}
              alt="password visibility"
            />
          </button>
        </article>

        <Button type="submit" text="Set new password" />
      </form>
    </section>
  );
};
