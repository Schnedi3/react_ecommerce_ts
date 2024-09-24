import { Request, Response } from "express";

import {
  addToCartDB,
  getCartDB,
  getCartIdByUserId,
  removeFromCartDB,
  updateCartDB,
} from "../database/cartDB";

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const cartId = await getCartIdByUserId(userId);

    const result = await getCartDB(cartId);

    res.status(200).json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  const { product_id, quantity } = req.body;

  try {
    const userId = req.user.id;
    const cartId = await getCartIdByUserId(userId);

    const result = await addToCartDB(cartId, product_id, quantity);

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      result,
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

    const result = await updateCartDB(quantity, cartId, product_id);

    res
      .status(200)
      .json({ success: true, message: "Quantity updated", result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  const { product_id } = req.body;

  try {
    const userId = req.user.id;
    const cartId = await getCartIdByUserId(userId);

    await removeFromCartDB(cartId, product_id);

    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
