import "../css/home.css";

import { Link } from "react-router-dom";
import { Product } from "../types/types";
import { useFetchProducts } from "../hooks/useFetch";

interface ProductCardProps {
  product: Product;
  error: string | null;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { error } = useFetchProducts();

  if (error) return <p>Error: {error}</p>;

  return (
    <section className="card__container">
      <figure className="img__container">
        <img src={product.thumbnail} alt={product.title} />
      </figure>
      <article className="card__info">
        <h3>{product.title}</h3>
        <h4>{product.price}$</h4>
        <Link to={`/product/${product.id}`}>View Details</Link>
      </article>
    </section>
  );
};
