import { useEffect, useState } from "react";

import { ICategoriesProps } from "../../types/types";
import { defaultCategory } from "./Home";
import { iconModal } from "../../Routes";
import "./categories.css";

export const Categories = ({
  products,
  selectedCategory,
  setSelectedCategory,
}: ICategoriesProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);

  const uniqueCategories = [
    defaultCategory,
    ...new Set(products.map((product) => product.category)),
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    closeModal();
  };

  useEffect(() => {
    window.addEventListener("resize", closeModal);

    return () => {
      window.removeEventListener("resize", closeModal);
    };
  }, []);

  return (
    <article className="categories">
      <button onClick={toggleModal}>
        {defaultCategory === selectedCategory
          ? "Filter by category"
          : selectedCategory}{" "}
        <span></span>
        <img src={iconModal} alt="Modal toggle icon" />
      </button>

      <ul className={isModalOpen ? "modal_open" : ""}>
        {uniqueCategories.map((category) => (
          <li
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={category === selectedCategory ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </article>
  );
};
