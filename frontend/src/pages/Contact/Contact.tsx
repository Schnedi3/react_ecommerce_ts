import { useValidateContact } from "../../hooks/useValidate";
import "./contact.css";

export const Contact = () => {
  const { register, handleSubmit, onSubmit, errors } = useValidateContact();

  return (
    <section className="contact_container  container">
      <h2>Get in touch</h2>
      <form
        className="contact_form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
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
        <button type="submit" className="contact_button">
          Send
        </button>
      </form>
    </section>
  );
};
