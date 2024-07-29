import "../css/detail.css";

import { AddProduct } from "../components/AddProduct";
import { useFetchProduct } from "../hooks/useFetch";

export const ProductDetail = () => {
  const { product } = useFetchProduct()

  return (
    <section className="container">
      <div className="info">
        <img src={product.image} alt={product.title} />
        <h2>{product.title}</h2>
        <h3>{product.price}$</h3>
        <p className="detail__desc">{product.description}</p>
        <AddProduct />
      </div>
    </section>
  );
};
