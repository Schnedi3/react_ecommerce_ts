import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getProductsRequest, removeProductRequest } from "../../api/product";
import { IProduct } from "../../types/types";
import iconRemove from "../../assets/images/remove.svg";
import "./products.css";

export const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await getProductsRequest();

      if (response.data.success) {
        setProducts(response.data.result);
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

  const removeProduct = async (id: number) => {
    try {
      const response = await removeProductRequest(id);

      if (response.data.success) {
        setProducts(products.filter((item) => item.id !== id));
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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="list container">
      <h2>All products</h2>
      <ul className="product">
        {products.map((item) => (
          <li key={item.id}>
            <img className="product_img" src={item.images[0]} />
            <h3>{item.title}</h3>
            <h4>{item.category}</h4>
            <p>{item.price}€</p>
            <img
              className="product_remove"
              src={iconRemove}
              alt="remove product"
              onClick={() => removeProduct(item.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
