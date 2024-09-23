import { Request, Response } from "express";
import { pool } from "../database/db";

export const createCartForUser = async (userId: number) => {
  const createCartQuery = "INSERT INTO cart (user_id) VALUES ($1) RETURNING *";
  const { rows } = await pool.query(createCartQuery, [userId]);
  return rows[0];
};

const getCartIdByUserId = async (userId: number) => {
  const findCartQuery = "SELECT id FROM cart WHERE user_id = $1";
  const userCart = await pool.query(findCartQuery, [userId]);
  return userCart.rows[0].id;
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const cartId = await getCartIdByUserId(userId);

    const getCartQuery = `
      SELECT p.id AS product_id, p.title, p.price, p.images, ci.quantity
      FROM cart_item ci
      JOIN product p ON ci.product_id = p.id
      WHERE ci.cart_id = $1;
    `;

    const { rows } = await pool.query(getCartQuery, [cartId]);

    res.status(200).json({ success: true, rows });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  const { product_id, quantity } = req.body;

  try {
    const userId = req.user.id;
    const cartId = await getCartIdByUserId(userId);

    const addToCartQuery =
      "INSERT INTO cart_item (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";

    const { rows } = await pool.query(addToCartQuery, [
      cartId,
      product_id,
      quantity,
    ]);

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cartItem: rows[0],
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCart = async (req: Request, res: Response) => {
  const { product_id, quantity } = req.body;

  try {
    const userId = req.user.id;
    const cartId = await getCartIdByUserId(userId);

    const updateCartItemQuery =
      "UPDATE cart_item SET quantity = $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *";
    const { rows } = await pool.query(updateCartItemQuery, [
      quantity,
      cartId,
      product_id,
    ]);

    res
      .status(200)
      .json({ success: true, message: "Quantity updated", cartItem: rows[0] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  const { product_id } = req.body;

  try {
    const userId = req.user.id;
    const cartId = await getCartIdByUserId(userId);

    const removeFromCartQuery =
      "DELETE FROM cart_item WHERE cart_id = $1 AND product_id = $2";

    await pool.query(removeFromCartQuery, [cartId, product_id]);

    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
