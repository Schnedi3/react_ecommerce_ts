import { useEffect, useState } from "react";

import { useFetchProducts } from "../../hooks/useFetch";
import { ICategoriesProps } from "../../types/types";
import iconModal from "../../assets/icons/icon-modal.svg";
import "./categories.css";

const defaultCategory: string = "All";

export const Categories = ({ setFilteredProducts }: ICategoriesProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>(defaultCategory);

  const { products } = useFetchProducts();

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
    selectedCategory === defaultCategory
      ? setFilteredProducts(products)
      : setFilteredProducts(
          products.filter((product) => product.category === selectedCategory)
        );
  }, [selectedCategory, setFilteredProducts, products]);

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
        <img src={iconModal} />
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
