import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getProductsRequest, deleteProductRequest } from "../../api/product";
import { IProduct } from "../../types/types";
import { formatCurrency } from "../../helpers/formatCurrency";

import { iconDelete, iconList } from "../../Routes";
import { imagesURL } from "../Config";
import styles from "./products.module.css";

export const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const getProducts = async () => {
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

  const deleteProduct = async (id: number) => {
    try {
      const response = await deleteProductRequest(id);

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
    getProducts();
  }, []);

  if (products.length === 0) {
    return (
      <section className={styles.empty}>
        <img className={styles.emptyIcon} src={iconList} alt="" />
        <p className={styles.emptyText}>No products yet</p>
      </section>
    );
  }

  return (
    <section className={styles.products}>
      <h2 className="title">All products</h2>
      <ul className={styles.product}>
        {products.map((item) => (
          <li className={styles.singleProduct} key={item.id}>
            <img
              className={styles.productImage}
              src={`${imagesURL}/${item.images[0]}`}
            />
            <h3>{item.title}</h3>
            <h4>{item.category}</h4>
            <p>{formatCurrency(item.price)}</p>
            <img
              className={styles.productDelete}
              src={iconDelete}
              alt="remove product"
              onClick={() => deleteProduct(item.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
