import { Request, Response } from "express";

import {
  getAddressDB,
  addAddressDB,
  removeAddressDB,
} from "../database/addressDB";

export const getAddress = async (req: Request, res: Response) => {
  try {
    const user_id = req.user.id;
    const result = await getAddressDB(user_id);

    res.status(200).json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addAddress = async (req: Request, res: Response) => {
  const {
    first_name,
    last_name,
    phone,
    street,
    number,
    door,
    city,
    state,
    zip_code,
  } = req.body;

  try {
    const user_id = req.user.id;
    const result = await addAddressDB(
      first_name,
      last_name,
      phone,
      street,
      number,
      door,
      city,
      state,
      zip_code,
      user_id
    );

    res.status(200).json({ success: true, message: "Address saved", result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeAddress = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await removeAddressDB(id);

    res.status(200).json({ success: true, message: "Address removed" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
