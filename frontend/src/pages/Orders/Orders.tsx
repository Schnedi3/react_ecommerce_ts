import { useEffect, useState } from "react";

import { getUserOrdersRequest, iconBox, Title } from "../../Routes";
import { formatCurrency } from "../../helpers/formatCurrency";
import { IOrder } from "../../types/types";
import { imagesURL } from "../config";
import styles from "./orders.module.css";

export const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const getUserOrders = async () => {
    try {
      const response = await getUserOrdersRequest();

      if (response.data.success) {
        setOrders(response.data.result);
      } else {
        console.log(response.data.message);
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
    getUserOrders();
  }, []);

  if (orders.length === 0) {
    return (
      <section className={styles.empty}>
        <img className={styles.emptyIcon} src={iconBox} alt="icon box" />
        <p className={styles.emptyText}>No orders yet</p>
      </section>
    );
  }

  return (
    <ul className={styles.orders}>
      <Title title="All orders" />

      {orders.map((order) => (
        <li className={styles.order} key={order.order_id}>
          {order.products.map((item) => (
            <article className={styles.product} key={item.id}>
              <img
                className={styles.productImage}
                src={`${imagesURL}/${item.images[0]}`}
                alt=""
              />

              <div className={styles.productInfo}>
                <h3>{item.title}</h3>
                <div>
                  <p>{formatCurrency(item.price)}</p>
                  <p>
                    <span className={styles.span}>Quantity:</span>{" "}
                    {item.quantity}
                  </p>
                  <p>
                    <span className={styles.span}>Size:</span> {item.size}
                  </p>
                </div>

                <p>
                  <span className={styles.span}>Date:</span>{" "}
                  {new Date(order.order_date).toLocaleString()}
                </p>
              </div>

              <p className={styles.status}>{order.order_status}</p>
            </article>
          ))}
        </li>
      ))}
    </ul>
  );
};
