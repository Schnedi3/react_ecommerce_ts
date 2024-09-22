import { useState } from "react";

import { useValidateLogin } from "../../hooks/useValidate";
import "./login.css";

export const Login = () => {
  const [currentState, setCurrentState] = useState<string>("Login");
  const isSignUp = currentState === "Sign Up";

  const { register, handleSubmit, onSubmit, errors } =
    useValidateLogin(isSignUp);

  return (
    <section className="login_container container">
      <h2>{currentState}</h2>

      <form
        className="form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        {isSignUp && (
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
        )}

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

        <button type="submit">
          {currentState === "Login" ? "Login" : "Sign up"}
        </button>

        <article className="footer_container">
          <h3>Forgot your password?</h3>
          {currentState === "Login" ? (
            <p onClick={() => setCurrentState("Sign Up")}>Create account</p>
          ) : (
            <p onClick={() => setCurrentState("Login")}>Login</p>
          )}
        </article>
      </form>
    </section>
  );
};
