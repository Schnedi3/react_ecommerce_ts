import { Request, Response } from "express";

import {
  addProductDB,
  getProductsDB,
  getProductDB,
  deleteProductDB,
} from "../database/productDB";

export const addProduct = async (req: Request, res: Response) => {
  const { title, description, price, category, subcategory, sizes } = req.body;
  const images = req.files as Express.Multer.File[];

  const imageUrls = images.map((file) => file.filename);

  try {
    const result = await addProductDB(
      title,
      description,
      price,
      category,
      subcategory,
      sizes,
      imageUrls
    );

    res.status(200).json({ success: true, message: "Product added", result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await getProductsDB();

    res.status(200).json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const result = await getProductDB(id);

    res.status(200).json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await deleteProductDB(id);

    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
