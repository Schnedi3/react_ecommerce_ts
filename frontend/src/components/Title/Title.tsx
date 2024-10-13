import styles from "./title.module.css";

type TitleProp = { title: string };

export const Title = ({ title }: TitleProp) => {
  return <h2 className={styles.title}>{title}</h2>;
};
