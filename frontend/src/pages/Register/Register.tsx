import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import { useAuthContext } from "../../context/useAuthContext";
import { registerSchema } from "../../schemas/schemas";
import { IRegister } from "../../types/types";
import { iconEyeClosed, iconEyeOpen } from "../../UIIcons";
import "./register.css";

export const Register = () => {
  const { signup } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegister>({
    resolver: zodResolver(registerSchema),
  });
  const [visible, setIsVisible] = useState<boolean>(false);

  const onSubmit = (data: IRegister) => {
    signup(data);
    reset();
  };
  return (
    <section className="register_container container">
      <h2>Sign up</h2>

      <form
        className="register_form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <label htmlFor="username">
          Username
          {errors.username && (
            <span className="error">{errors.username.message}</span>
          )}
          <input
            type="text"
            id="username"
            placeholder="John Doe"
            {...register("username")}
          />
        </label>

        <label htmlFor="email">
          Email
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
          <input
            type="email"
            id="email"
            placeholder="johndoe@lorem.com"
            {...register("email")}
          />
        </label>

        <label htmlFor="password">
          Password
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
          <input
            type={visible ? "text" : "password"}
            id="password"
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

        <button type="submit">Sign Up</button>

        <article className="register_footer">
          <h3>Forgot your password?</h3>
          <Link to="/login">Login</Link>
        </article>
      </form>
    </section>
  );
};
