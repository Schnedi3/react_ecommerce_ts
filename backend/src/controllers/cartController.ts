import { Request, Response } from "express";

import {
  addToCartDB,
  getCartDB,
  getCartIdByUserId,
  deleteFromCartDB,
  updateCartDB,
} from "../database/cartDB";

export const getCart = async (req: Request, res: Response) => {
  try {
    const user_id = req.user.id;

    const cart_id = await getCartIdByUserId(user_id);
    const result = await getCartDB(cart_id);

    res.status(200).json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  const product_id = Number(req.params.id);
  const { quantity, size } = req.body;

  try {
    const user_id = req.user.id;

    const cart_id = await getCartIdByUserId(user_id);
    const result = await addToCartDB(cart_id, product_id, quantity, size);

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
  const product_id = Number(req.params.id);
  const { quantity, size } = req.body;
  try {
    const user_id = req.user.id;

    const cart_id = await getCartIdByUserId(user_id);
    const result = await updateCartDB(quantity, cart_id, product_id, size);

    res
      .status(200)
      .json({ success: true, message: "Quantity updated", result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteFromCart = async (req: Request, res: Response) => {
  const product_id = Number(req.params.id);
  const { size } = req.body;

  try {
    const user_id = req.user.id;

    const cart_id = await getCartIdByUserId(user_id);
    await deleteFromCartDB(cart_id, product_id, size);

    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
