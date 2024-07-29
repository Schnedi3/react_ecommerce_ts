import "../css/home.css";

import { Link } from "react-router-dom";
import { Product } from '../types/types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <section className="card__container">
      <div className="img__container">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="card__info">
        <h3>{product.title}</h3>
        <h4>{product.price}$</h4>
        <p>{product.category}</p>
        <Link to={`/product/${product.id}`}>View Details</Link>
      </div>
    </section>
  );
};
