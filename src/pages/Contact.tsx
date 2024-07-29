import "../css/contact.css";

import { useValidateForm } from "../hooks/useValidationForm";

export const Contact = () => {
  const { register, handleSubmit, onSubmit, errors, successMessage } =
    useValidateForm();

  return (
    <section className="container">
      <form
        className="contact__form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <h2>Stay in touch</h2>
        <input type="text" placeholder="Name" {...register("name")} />
        {errors.name && <span className="error">{errors.name.message}</span>}
        <input type="email" placeholder="Email" {...register("email")} />
        {errors.email && <span className="error">{errors.email.message}</span>}
        <textarea
          rows={3}
          placeholder="Message"
          {...register("message")}
        ></textarea>
        {errors.message && (
          <span className="error">{errors.message.message}</span>
        )}
        <button type="submit" className="contact__button">
          Send
        </button>
        {successMessage && <span className="success">{successMessage}</span>}
      </form>
    </section>
  );
};
