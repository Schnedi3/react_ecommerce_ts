import "../css/home.css";

import { useState, useEffect } from "react";
import { useFetchProducts } from "../hooks/useFetch";
import { Product } from "../types/types";

const defaultCategory: string = "All";

export const Products = () => {
  const { products } = useFetchProducts();

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>(defaultCategory);

  const uniqueCategories = [
    defaultCategory,
    ...new Set(products.map((product) => product.category)),
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    selectedCategory === defaultCategory
      ? setFilteredProducts(products)
      : setFilteredProducts(
          products.filter((product) => product.category === selectedCategory)
        );
  }, [selectedCategory, products]);

  return {
    uniqueCategories,
    handleCategoryChange,
    selectedCategory,
    filteredProducts,
  };
};
