import { useState } from "react";
import { Link } from "react-router-dom";

import { useFetchProducts } from "../../hooks/useFetch";
import { useCartContext } from "../../context/useCartContext";
import { IProduct } from "../../types/types";
import { Categories } from "./Categories";
import "./home.css";

export const Home = () => {
  const { products, loading, error } = useFetchProducts();
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const { cart } = useCartContext();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="home_container container">
      <header className="header">
        <h1>Products</h1>
        <Categories
          products={products}
          setFilteredProducts={setFilteredProducts}
        />
      </header>

      <article className="cards">
        {filteredProducts.map((product) => (
          <Link
            to={`/product/${product.id}`}
            className="card_container"
            key={product.id}
          >
            <figure className="img_container">
              <img src={product.thumbnail} alt={product.title} />
            </figure>
            <div className="card_info">
              <h3>{product.title}</h3>
              <div>
                <h4>{product.price}$</h4>
                {cart.map((item) => (
                  <p
                    key={item.id}
                    className={item.id === product.id ? "home_badge" : ""}
                  >
                    {item.id === product.id ? "on cart" : ""}
                  </p>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </article>
    </section>
  );
};
