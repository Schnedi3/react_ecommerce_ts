import { ISearchProps } from "../../types/types";
import { iconClose, iconSearch } from "../../Routes";
import styles from "./search.module.css";

export const Search = ({ inputValue, setInputValue }: ISearchProps) => {
  return (
    <article className={styles.search}>
      <img className={styles.iconSearch} src={iconSearch} alt="search icon" />
      <input
        className={styles.input}
        type="text"
        placeholder="Search for a product..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <img
        className={`${styles.clearIcon} ${
          inputValue ? styles.showClearIcon : ""
        }`}
        src={iconClose}
        alt="clear field"
        onClick={() => setInputValue("")}
      />
    </article>
  );
};
