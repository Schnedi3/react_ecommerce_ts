import "../css/detail.css";

import { AddProduct } from "../components/AddProduct";
import { useFetchProduct } from "../hooks/useFetch";

export const ProductDetail = () => {
  const { product, error } = useFetchProduct();

  if (error) return <p>Error: {error}</p>;

/*   if (!product) return <p>No product data available.</p>; */

  return (
    <section className="container">
      <div className="detail__info">
        <img src={product.thumbnail} alt={product.title} />
        <h2>{product.title}</h2>
        <h3>{product.price}$</h3>
        <p>{product.description}</p>
        <AddProduct />
      </div>
    </section>
  );
};
