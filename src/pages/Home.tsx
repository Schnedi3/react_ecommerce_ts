import { Products } from "../components/Products";
import { ProductCard } from "../components/ProductCard";
import { useEffect, useState } from "react";

export const Home = () => {
  const {
    uniqueCategories,
    handleCategoryChange,
    selectedCategory,
    filteredProducts,
  } = Products();

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="main__container">
      <h1>Products</h1>

      <div className="categories">
        {windowWidth > 700 ? (
          uniqueCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={category === selectedCategory ? "active" : ""}
            >
              {category}
            </button>
          ))
        ) : (
          <div className="select">
            <select onChange={(e) => handleCategoryChange(e.target.value)}>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <section className="cards">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} error={null} />
        ))}
      </section>
    </div>
  );
};
