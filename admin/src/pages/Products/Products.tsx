import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getProductsRequest, deleteProductRequest } from "../../api/product";
import { IProduct } from "../../types/types";
import { formatCurrency } from "../../helpers/formatCurrency";

import { iconDelete, iconList } from "../../Routes";
import "./products.css";
import "../globals.css";

const baseURL = "http://localhost:4000/images/";

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
      <section className="products_empty container">
        <img src={iconList} alt="" />
        <p>No products yet</p>
      </section>
    );
  }

  return (
    <section className="product_container container">
      <h2>All products</h2>
      <ul className="product">
        {products.map((item) => (
          <li key={item.id}>
            <img className="product_img" src={`${baseURL}/${item.images[0]}`} />
            <h3>{item.title}</h3>
            <h4>{item.category}</h4>
            <p>{formatCurrency(item.price)}</p>
            <img
              className="product_remove"
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
