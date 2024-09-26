import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useCartContext } from "../../context/useCartContext";
import { singleProductRequest } from "../../api/product";
import { IProduct } from "../../types/types";
import "./detail.css";

export const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const { cart, addToCart } = useCartContext();
  const [product, setProduct] = useState<IProduct | undefined>(undefined);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const response = await singleProductRequest(parseInt(id));

          if (response.data.success) {
            setProduct(response.data.result);
          } else {
            toast.error(response.data.message);
          }
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("An unexpected error occurred");
        }
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Product not found</p>;

  const { title, description, price, images } = product;
  const onCart = cart.some((item) => item.product_id === product.id);

  return (
    <section className="detail_container container">
      <img src={images[0]} alt={title} />
      <article className="detail_info">
        <h2>{title}</h2>
        <h3>{price}$</h3>
        <p>{description}</p>
        <button
          className={onCart ? "disabled" : ""}
          onClick={() => addToCart(product, 1)}
        >
          {onCart ? "Already on cart" : "Add to Cart"}
        </button>
      </article>
    </section>
  );
};
