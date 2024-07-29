import { Product } from "../types/types";
import { Products } from "../components/Products";
import { ProductCard } from "../components/ProductCard";

export const Home = () => {
  const {
    uniqueCategories,
    handleCategoryChange,
    selectedCategory,
    filteredProducts,
  } = Products();

  return (
    <div className="main__container">
      <h1>Products</h1>

      <div className="categories">
        {uniqueCategories.map((category: string) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={category === selectedCategory ? "active" : ""}
          >
            {category}
          </button>
        ))}
      </div>

      <section className="cards">
        {filteredProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
};
