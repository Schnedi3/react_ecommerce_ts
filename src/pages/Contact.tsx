import "../css/contact.css";
import contactImage from "../assets/icons//contact-img.svg";

import { useValidateForm } from "../hooks/useValidationForm";

export const Contact = () => {
  const { register, handleSubmit, onSubmit, errors, successMessage } =
    useValidateForm();

  return (
    <section className="container contact__container">
      <>
        <img className="contact__img" src={contactImage} alt="contact image" />
        <form
          className="contact__form"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <h2>Get in touch</h2>
          <input type="text" placeholder="Name" {...register("name")} />
          {errors.name && <span className="error">{errors.name.message}</span>}
          <input type="email" placeholder="Email" {...register("email")} />
          {errors.email && <span className="error">{errors.email.message}</span>}
          <textarea
            rows={3}
            placeholder="Message"
            {...register("message")}
          ></textarea>
          {errors.message && <span className="error">{errors.message.message}</span>}
          <button type="submit" className="contact__button">
            send
          </button>
          {successMessage && <span className="success">{successMessage}</span>}
        </form>
      </>
    </section>
  );
};
