import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import { useAuthContext } from "../../context/useAuthContext";
import { loginSchema } from "../../schemas/schemas";
import { ILogin } from "../../types/types";

import { iconEyeClosed, iconEyeOpen, iconGoogle } from "../../UIIcons";
import "./login.css";
import "../globals.css";

export const Login = () => {
  const { googleLogin, login } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });
  const [visible, setIsVisible] = useState<boolean>(false);

  const onSubmit = (data: ILogin) => {
    login(data);
    reset();
  };

  return (
    <section className="login_container container">
      <button className="gbutton" onClick={() => googleLogin()}>
        <img src={iconGoogle} />
        <p>Login with Google</p>
      </button>

      <article className="separator">
        <span></span>
        <p>or</p>
        <span></span>
      </article>

      <form
        className="login_form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <h2>Login</h2>

        <label>
          Email
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
          <input
            type="email"
            className={errors.email ? "input_error" : ""}
            placeholder="johndoe@lorem.com"
            {...register("email")}
          />
        </label>

        <label>
          Password
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
          <input
            type={visible ? "text" : "password"}
            className={errors.password ? "input_error" : ""}
            placeholder="A1b2C3d4"
            {...register("password")}
          />
          <button
            type="button"
            className="view_pass"
            onClick={() => setIsVisible(!visible)}
          >
            <img
              src={visible ? iconEyeOpen : iconEyeClosed}
              alt="password visibility"
            />
          </button>
        </label>

        <button className="dark_button dark_button-login" type="submit">
          Login
        </button>

        <article className="login_footer">
          <p>Forgot your password?</p>
          <Link to="/register">Create an account</Link>
        </article>
      </form>
    </section>
  );
};
