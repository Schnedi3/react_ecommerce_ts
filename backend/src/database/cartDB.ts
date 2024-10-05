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
    SELECT p.id AS product_id, p.title, p.price, p.images, ci.quantity, ci.size
    FROM cart_item ci
    JOIN product p ON ci.product_id = p.id
    WHERE ci.cart_id = $1`;

  const result = await pool.query(getCartQuery, [cartId]);
  return result.rows;
};

export const addToCartDB = async (
  cartId: number,
  productId: number,
  quantity: number,
  size: string
) => {
  const addToCartQuery = `
    INSERT INTO cart_item (cart_id, product_id, quantity, size)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;

  const result = await pool.query(addToCartQuery, [
    cartId,
    productId,
    quantity,
    size,
  ]);

  return result.rows[0];
};

export const updateCartDB = async (
  quantity: number,
  cartId: number,
  productId: number,
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
    cartId,
    productId,
    size,
  ]);

  return result.rows[0];
};

export const deleteFromCartDB = async (
  cartId: number,
  productId: number,
  size: string
) => {
  const deleteFromCartQuery = `
    DELETE FROM cart_item
    WHERE cart_id = $1
    AND product_id = $2
    AND size = $3`;

  await pool.query(deleteFromCartQuery, [cartId, productId, size]);
};

export const emptyCartDb = async (cartId: number) => {
  const emptyCartQuery = `DELETE FROM cart_item WHERE cart_id = $1`;

  return await pool.query(emptyCartQuery, [cartId]);
};
