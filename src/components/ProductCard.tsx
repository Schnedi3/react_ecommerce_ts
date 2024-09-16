import { Link } from "react-router-dom";

import { IProductCardProps } from "../types/types";
import { useFetchProducts } from "../hooks/useFetch";
import "../css/home.css";

export const ProductCard = ({ product }: IProductCardProps) => {
  const { error } = useFetchProducts();

  if (error) return <p>{error}</p>;

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
