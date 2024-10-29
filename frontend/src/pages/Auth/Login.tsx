import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import { useLogin, useLoginGoogle } from "../../api/auth";
import { loginSchema } from "../../schemas/schemas";
import { IUser } from "../../types/types";
import {
  Button,
  iconEyeClosed,
  iconEyeOpen,
  iconGoogle,
  Title,
} from "../../Routes";
import styles from "./auth.module.css";

export const Login = () => {
  const [visible, setIsVisible] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: zodResolver(loginSchema),
  });
  const { mutate: googleLogin } = useLoginGoogle();
  const { mutate: loginUser } = useLogin();

  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => googleLogin(codeResponse.access_token),
    onError: (error) => console.log("Login Failed:", error),
  });

  const onSubmit = (data: IUser) => {
    loginUser(data);
  };

  return (
    <section className={styles.auth}>
      <button className={styles.gbutton} onClick={() => loginGoogle()}>
        <img className={styles.googleIcon} src={iconGoogle} />
        <p className={styles.gbuttonText}>Login with Google</p>
      </button>

      <article className={styles.separator}>
        <span></span>
        <p>or</p>
        <span></span>
      </article>

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Title title="Login" />

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
          <label htmlFor="password">Password</label>
          <button
            className={styles.viewPassword}
            type="button"
            onMouseDown={() => setIsVisible(true)}
            onMouseUp={() => setIsVisible(false)}
            onMouseLeave={() => setIsVisible(false)}
          >
            <img
              className={styles.viewPasswordIcon}
              src={visible ? iconEyeClosed : iconEyeOpen}
              alt="password visibility"
            />
          </button>
        </article>

        <Button type="submit" text="Login" />

        <article className={styles.footer}>
          <Link className={styles.footerLink} to="/register">
            Create an account
          </Link>
          <Link className={styles.footerLink} to="/reset-password">
            Forgot your password?
          </Link>
        </article>
      </form>
    </section>
  );
};
