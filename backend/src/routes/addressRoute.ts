import { Router } from "express";

import {
  getAddress,
  addAddress,
  deleteAddress,
  updateAddress,
} from "../controllers/addressController";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// user
router.get("/", validateToken, getAddress);
router.post("/", validateToken, addAddress);
router.delete("/:id", validateToken, deleteAddress);
router.put("/:id", validateToken, updateAddress);

export default router;
