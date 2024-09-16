import "../css/detail.css";

import { AddProduct } from "../components/AddProduct";
import { useFetchProduct } from "../hooks/useFetch";

export const ProductDetail = () => {
  const { product, error } = useFetchProduct();

  if (error) return <p>Error: {error}</p>;

  return (
    <section className="container">
      {product ? (
        <div className="detail__info">
          <img src={product.thumbnail} alt={product.title} />
          <h2>{product.title}</h2>
          <h3>{product.price}$</h3>
          <p>{product.description}</p>
          <AddProduct />
        </div>
      ) : (
        <p>Failed to load product</p>
      )}
    </section>
  );
};
