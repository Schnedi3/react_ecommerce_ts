import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import { useShopContext } from "../../context/useShopContext";
import {
  addToCartRequest,
  getProductRequest,
  iconNext,
  iconPrevious,
} from "../../Routes";
import { DetailSkeleton } from "../../skeletons/DetailSkeleton";
import { formatCurrency } from "../../helpers/formatCurrency";
import { IProduct } from "../../types/types";
import { imagesURL } from "../config";

import "./detail.css";
import "../globals.css";

export const Detail = () => {
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [currentImage, setCurrentImage] = useState(0);
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

  const handlePrevious = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };

  const handleNext = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };

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
      (item) => item.productId === product.id && item.size === size
    );
  };

  const handleSize = (size: string) => {
    setSelectedSize(selectedSize === size ? "" : size);
  };

  const variants = {
    initial: { scale: 0.5 },
    animate: { scale: 1 },
    exit: { scale: 0.5 },
  };

  return (
    <section className="detail_container container">
      <article className="images">
        <span onClick={handlePrevious}>
          <img src={iconPrevious} alt="previous image" />
        </span>
        <motion.img
          key={currentImage}
          src={`${imagesURL}/${images[currentImage]}`}
          alt="sneakers image"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.5 }}
        />
        <span onClick={handleNext}>
          <img src={iconNext} alt="next image" />
        </span>
      </article>
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
          className="dark_button dark_button-detail"
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
