import "../css/contact.css";
import contactImage from "../assets/icons//contact-img.svg";

import { useValidateForm } from "../hooks/useValidationForm";

export const Contact = () => {
  const { register, handleSubmit, onSubmit, errors, isSubmitted } =
    useValidateForm();

  return (
    <section className="container contact__container">
      <img className="contact__img" src={contactImage} alt="contact image" />
      <form
        className="contact__form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <h2>Get in touch</h2>
        <label htmlFor="name" className="label">
          Name
          {errors.name && <span className="error">{errors.name.message}</span>}
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            {...register("name")}
          />
        </label>
        <label htmlFor="email" className="label">
          Email
          <input
            type="email"
            id="email"
            placeholder="johndoe@lorem.com"
            {...register("email")}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </label>
        <label htmlFor="message" className="label">
          Message
          {errors.message && (
            <span className="error">{errors.message.message}</span>
          )}
          <textarea
            id="message"
            rows={3}
            placeholder="lorem ipsum..."
            {...register("message")}
          ></textarea>
        </label>
        <button type="submit" className="contact__button">
          send
        </button>
        {isSubmitted && (
          <span className="success">Form submitted successfully!</span>
        )}
      </form>
    </section>
  );
};
