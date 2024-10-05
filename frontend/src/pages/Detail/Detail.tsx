import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useShopContext } from "../../context/useShopContext";
import { addToCartRequest, getProductRequest } from "../../Routes";
import { DetailSkeleton } from "../../skeletons/DetailSkeleton";
import { formatCurrency } from "../../helpers/formatCurrency";
import { IProduct } from "../../types/types";

import "./detail.css";
import "../globals.css";

export const Detail = () => {
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { id } = useParams<string>();
  const { cart, setCart, getCart } = useShopContext();

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

  const addToCart = async (
    product: IProduct,
    quantity: number,
    selectedSize: string
  ) => {
    if (!selectedSize) return toast.error("Select a size first");

    try {
      const response = await addToCartRequest(
        product.id,
        quantity,
        selectedSize
      );

      if (response.data.success) {
        const newItem = response.data.result;
        setCart([...cart, newItem]);
        getCart();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  if (!product) return <DetailSkeleton />;
  const { title, description, price, sizes, images } = product;

  const isSizeInCart = (size: string) => {
    return cart.some(
      (item) => item.product_id === product.id && item.size === size
    );
  };

  const handleSize = (size: string) => {
    setSelectedSize(selectedSize === size ? "" : size);
  };

  return (
    <section className="detail_container container">
      <img src={images[0]} alt={title} />
      <article className="detail_info">
        <h3>{title}</h3>
        <h4>{formatCurrency(price)}</h4>
        <p>{description}</p>
        <ul>
          {sizes.map((size) => (
            <li key={size}>
              <button
                className={selectedSize === size ? "selected" : ""}
                id={isSizeInCart(size) ? "disabled" : ""}
                onClick={() => handleSize(size)}
              >
                {size}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="dark_button"
          id={!selectedSize ? "dark_button-disabled" : ""}
          onClick={() => {
            addToCart(product, 1, selectedSize), setSelectedSize("");
          }}
        >
          Add to Cart
        </button>
      </article>
    </section>
  );
};
