import styles from "./button.module.css";

interface IButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
}

export const Button = ({ type, text }: IButtonProps) => {
  return (
    <button className={styles.button} type={type}>
      {text}
    </button>
  );
};
