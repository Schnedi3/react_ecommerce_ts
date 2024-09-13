import { useState } from "react";

import { Product } from "../../types/types";
import { ProductCard } from "../../components/ProductCard";
import { Categories } from "./Categories";

export const Home = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  return (
    <section className="main__container">
      <header className="header">
        <h1>Products</h1>
        <Categories setFilteredProducts={setFilteredProducts} />
      </header>

      <article className="cards">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} error={null} />
        ))}
      </article>
    </section>
  );
};
