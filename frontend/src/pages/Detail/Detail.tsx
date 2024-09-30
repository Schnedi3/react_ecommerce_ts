import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useCartContext } from "../../context/useCartContext";
import { getProductRequest } from "../../api/product";
import { IProduct } from "../../types/types";
import { DetailSkeleton } from "../../skeletons/DetailSkeleton";
import "./detail.css";

export const Detail = () => {
  const { id } = useParams<string>();
  const { cart, addToCart } = useCartContext();
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        if (id) {
          const response = await getProductRequest(parseInt(id));

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

    getProduct();
  }, [id]);

  if (!product) return <DetailSkeleton />;
  const { title, description, price, sizes, images } = product;

  const handleSize = (size: string) => {
    if (!selectedSize) {
      setSelectedSize(size);
    } else {
      setSelectedSize("");
    }
  };

  return (
    <section className="detail_container container">
      <img src={images[0]} alt={title} />
      <article className="detail_info">
        <h3>{title}</h3>
        <h4>{price}$</h4>
        <p>{description}</p>
        <ul>
          {sizes.map((size) => (
            <li key={size}>
              <button
                className={`${selectedSize === size ? "selected" : ""}${
                  cart.some((item) => item.size === size) ? "disabled" : ""
                }`}
                onClick={() => handleSize(size)}
              >
                {size}
              </button>
            </li>
          ))}
        </ul>
        <button
          className={`dark_button${
            !selectedSize ? " dark_button-disabled" : ""
          }`}
          onClick={() => addToCart(product, 1, selectedSize)}
        >
          Add to Cart
        </button>
      </article>
    </section>
  );
};
