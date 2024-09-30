import { pool } from "./db";

export const createCartForUser = async (user_id: number) => {
  const createCartQuery = `
    INSERT INTO cart (user_id)
    VALUES ($1)
    RETURNING *`;

  const result = await pool.query(createCartQuery, [user_id]);
  return result.rows[0];
};

export const getCartIdByUserId = async (user_id: number) => {
  const findCartQuery = `
    SELECT id FROM cart
    WHERE user_id = $1`;

  const result = await pool.query(findCartQuery, [user_id]);
  return result.rows[0].id;
};

export const getCartDB = async (cart_id: number) => {
  const getCartQuery = `
    SELECT p.id AS product_id, p.title, p.price, p.images, ci.quantity, ci.size
    FROM cart_item ci
    JOIN product p ON ci.product_id = p.id
    WHERE ci.cart_id = $1;`;

  const result = await pool.query(getCartQuery, [cart_id]);
  return result.rows;
};

export const addToCartDB = async (
  cart_id: number,
  product_id: number,
  quantity: number,
  size: string
) => {
  const addToCartQuery = `
    INSERT INTO cart_item (cart_id, product_id, quantity, size)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;

  const result = await pool.query(addToCartQuery, [
    cart_id,
    product_id,
    quantity,
    size,
  ]);

  return result.rows[0];
};

export const updateCartDB = async (
  quantity: number,
  cart_id: number,
  product_id: number,
  size: string
) => {
  const updateCartItemQuery = `
    UPDATE cart_item
    SET quantity = $1
    WHERE cart_id = $2
    AND product_id = $3
    AND size = $4
    RETURNING *`;

  const result = await pool.query(updateCartItemQuery, [
    quantity,
    cart_id,
    product_id,
    size,
  ]);

  return result.rows[0];
};

export const removeFromCartDB = async (
  cart_id: number,
  product_id: number,
  size: string
) => {
  const removeFromCartQuery = `
    DELETE FROM cart_item
    WHERE cart_id = $1
    AND product_id = $2
    AND size = $3`;

  await pool.query(removeFromCartQuery, [cart_id, product_id, size]);
};
