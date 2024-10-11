import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../context/useAuthContext";
import { ILogin } from "../../types/types";

import { iconEyeClosed, iconEyeOpen } from "../../Routes";
import styles from "./login.module.css";

export const Login = () => {
  const [visible, setIsVisible] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm<ILogin>();
  const { isAuthenticated, login } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = (data: ILogin) => {
    login(data);
    // reset();
  };

  useEffect(() => {
    if (isAuthenticated) return navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <section className={styles.login}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <h2 className="title">Login</h2>

        <label className={styles.label}>
          Email
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
          <input
            className={`${styles.input} ${
              errors.email ? styles.inputError : ""
            }`}
            type="email"
            placeholder="johndoe@lorem.com"
            {...register("email", { required: "Email is required" })}
          />
        </label>

        <label className={styles.label}>
          Password
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
          <input
            className={`${styles.input} ${
              errors.password ? styles.inputError : ""
            }`}
            type={visible ? "text" : "password"}
            placeholder="A1b2C3d4"
            {...register("password", { required: "Password is required" })}
          />
          <button
            className={styles.viewPassword}
            type="button"
            onClick={() => setIsVisible(!visible)}
          >
            <img
              className={styles.viewIcon}
              src={visible ? iconEyeOpen : iconEyeClosed}
              alt="password visibility"
            />
          </button>
        </label>

        <button className="dark_button" type="submit">
          Login
        </button>
      </form>
    </section>
  );
};
