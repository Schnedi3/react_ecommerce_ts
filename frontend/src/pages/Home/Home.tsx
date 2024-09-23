import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useCartContext } from "../../context/useCartContext";
import { listProductsRequest } from "../../api/product";
import { IProduct } from "../../types/types";
import { Categories } from "./Categories";
import "./home.css";

export const Home = () => {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const { cart } = useCartContext();
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await listProductsRequest();

      if (response.data.success) {
        setProducts(response.data.rows);
      } else {
        toast.error(response.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="home_container container">
      <header className="header">
        <h1>Products</h1>
        <Categories
          products={products}
          setFilteredProducts={setFilteredProducts}
        />
      </header>

      <article className="cards">
        {filteredProducts.map((product) => {
          const onCart = cart.some((item) => item.product_id === product.id);
          return (
            <Link
              to={`/product/${product.id}`}
              className="card_container"
              key={product.id}
            >
              <img src={product.images[0]} alt={product.title} />
              <div className="card_info">
                <h3>{product.title}</h3>
                <div>
                  <h4>{product.price}$</h4>
                  {onCart && <p className="home_badge">on cart</p>}
                </div>
              </div>
            </Link>
          );
        })}
      </article>
    </section>
  );
};
