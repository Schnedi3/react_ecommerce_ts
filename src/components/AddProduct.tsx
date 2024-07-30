import "../css/detail.css";

import { useCartContext } from "../context/useCartContext";
import { useFetchProduct } from "../hooks/useFetch";

export const AddProduct = () => {
  const { product } = useFetchProduct();
  const { cart, addToCart } = useCartContext();

  const article = cart.find((prod) => prod.id === product.id);

  return (
    <button className="add__cart" onClick={() => addToCart(product)}>
      Add to Cart{" "}
      <span className="add__quantity">
        {article && <>({article.quantity})</>}
      </span>
    </button>
  );
};
