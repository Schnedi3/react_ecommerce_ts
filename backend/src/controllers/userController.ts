import { Request, Response } from "express";

import { getUserDB, getUsersDB, removeUserDB } from "../database/userDB";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await getUsersDB();

    res.status(200).json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const result = await getUserDB(id);

    res.status(200).json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await removeUserDB(id);

    res.status(200).json({ success: true, message: "User removed" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
