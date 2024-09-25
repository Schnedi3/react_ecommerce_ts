import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import { useAuthContext } from "../../context/useAuthContext";
import { loginSchema } from "../../schemas/schemas";
import { ILogin } from "../../types/types";

import iconGoogle from "../../assets/icons/google.svg";
import "./login.css";

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
            type="password"
            id="password"
            placeholder="A1b2C3d4"
            {...register("password")}
          />
        </label>

        <button type="submit">Login</button>

        <article className="login_footer">
          <h3>Forgot your password?</h3>
          <Link to="/register">Create an account</Link>
        </article>
      </form>
    </section>
  );
};
