import { pool } from "./db";

export const addOrderDB = async (
  user_id: number,
  cart_id: number,
  address_id: number,
  amount: number,
  payment_method: string
) => {
  const addQuery = `
    INSERT INTO order (user_id, cart_id, address_id, amount, payment_method)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;

  const result = await pool.query(addQuery, [
    user_id,
    cart_id,
    address_id,
    amount,
    payment_method,
  ]);

  return result.rows[0];
};

export const getOrdersDB = async () => {
  const ordersQuery = "SELECT * FROM order";

  const result = await pool.query(ordersQuery);
  return result.rows;
};

export const getOrderDB = async (user_id: number) => {
  const orderQuery = `
    SELECT * FROM order
    WHERE user_id = $1`;

  const result = await pool.query(orderQuery, [user_id]);
  return result.rows;
};

export const updateStatusDB = async (id: number) => {
  const orderQuery = `
    SELECT * FROM order
    WHERE id = $1`;

  const result = await pool.query(orderQuery, [id]);
  return result.rows;
};
