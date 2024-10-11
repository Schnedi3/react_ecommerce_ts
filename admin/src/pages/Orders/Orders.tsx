import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getOrdersRequest,
  deleteOrderRequest,
  updateOrderRequest,
} from "../../api/order";
import { IOrder } from "../../types/types";
import { formatCurrency } from "../../helpers/formatCurrency";

import { iconBox, iconDelete } from "../../Routes";
import styles from "./orders.module.css";

export const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const getOrders = async () => {
    try {
      const response = await getOrdersRequest();

      if (response.data.success) {
        setOrders(response.data.result);
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

  const handleOnChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number
  ) => {
    const status = e.target.value;
    updateOrder(id, status);
  };

  const updateOrder = async (id: number, status: string) => {
    try {
      const response = await updateOrderRequest(id, status);

      if (response.data.success) {
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

  const deleteOrder = async (id: number) => {
    try {
      const response = await deleteOrderRequest(id);

      if (response.data.success) {
        setOrders(orders.filter((order) => order.order_id !== id));
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
    getOrders();
  }, []);

  if (orders.length === 0) {
    return (
      <section className={styles.empty}>
        <img className={styles.emptyIcon} src={iconBox} alt="" />
        <p className={styles.emptyText}>No orders yet</p>
      </section>
    );
  }

  return (
    <section className={styles.orders}>
      <h2 className="title">All orders</h2>
      <ul className="order">
        {orders.map((order) => (
          <li className={styles.singleOrder} key={order.order_id}>
            <img className={styles.orderIcon} src={iconBox} />

            <article>
              {order.products.map((item) => (
                <p key={item.id}>
                  {item.title} x {item.quantity} {item.size}
                </p>
              ))}
              <br />
              <p>
                {order.first_name} {order.last_name}
              </p>
              <p>
                {order.street}, {order.number} - {order.door}
              </p>
              <p>
                {order.city}, {order.state}, {order.zip_code}
              </p>
              <p>
                <span className={styles.orderSpan}>Phone number:</span>{" "}
                {order.phone}
              </p>
            </article>

            <article>
              <p>
                <span className={styles.orderSpan}>Items:</span>{" "}
                {order.products.length}
              </p>
              <p>
                <span className={styles.orderSpan}>Payment method:</span>{" "}
                {order.payment_method}
              </p>
              <p>
                <span className={styles.orderSpan}>Date:</span>{" "}
                {new Date(order.order_date).toLocaleString()}
              </p>
            </article>

            <h3>{formatCurrency(order.order_amount)}</h3>

            <select
              className={styles.orderSelect}
              onChange={(e) => handleOnChange(e, order.order_id)}
            >
              <option value="Order placed">Order placed</option>
              <option value="On transit">On transit</option>
              <option value="Delivered">Delivered</option>
            </select>

            <img
              className={styles.orderDelete}
              src={iconDelete}
              alt="delete order"
              onClick={() => deleteOrder(order.order_id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
