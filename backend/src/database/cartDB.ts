import { pool } from "./db";

export const createCartForUser = async (userId: number) => {
  const createCartQuery = `
    INSERT INTO cart (user_id)
    VALUES ($1)
    RETURNING *`;

  const result = await pool.query(createCartQuery, [userId]);
  return result.rows[0];
};

export const getCartIdByUserId = async (userId: number) => {
  const findCartQuery = `
    SELECT id FROM cart
    WHERE user_id = $1`;

  const result = await pool.query(findCartQuery, [userId]);
  return result.rows[0].id;
};

export const getCartDB = async (cartId: number) => {
  const getCartQuery = `
    SELECT p.id AS product_id, p.title, p.price, p.images, ci.quantity
    FROM cart_item ci
    JOIN product p ON ci.product_id = p.id
    WHERE ci.cart_id = $1;`;

  const result = await pool.query(getCartQuery, [cartId]);
  return result.rows;
};

export const addToCartDB = async (
  cartId: number,
  product_id: number,
  quantity: number
) => {
  const addToCartQuery = `
    INSERT INTO cart_item (cart_id, product_id, quantity)
    VALUES ($1, $2, $3)
    RETURNING *`;

  const result = await pool.query(addToCartQuery, [
    cartId,
    product_id,
    quantity,
  ]);

  return result.rows[0];
};

export const updateCartDB = async (
  quantity: number,
  cartId: number,
  product_id: number
) => {
  const updateCartItemQuery = `
    UPDATE cart_item
    SET quantity = $1
    WHERE cart_id = $2
    AND product_id = $3
    RETURNING *`;

  const result = await pool.query(updateCartItemQuery, [
    quantity,
    cartId,
    product_id,
  ]);

  return result.rows[0];
};

export const removeFromCartDB = async (cartId: number, product_id: number) => {
  const removeFromCartQuery = `
    DELETE FROM cart_item
    WHERE cart_id = $1
    AND product_id = $2`;

  await pool.query(removeFromCartQuery, [cartId, product_id]);
};
