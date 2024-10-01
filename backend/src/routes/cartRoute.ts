import { Router } from "express";

import {
  getCart,
  addToCart,
  updateCart,
  deleteFromCart,
} from "../controllers/cartController";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// user
router.get("/", validateToken, getCart);
router.post("/:id", validateToken, addToCart);
router.put("/:id", validateToken, updateCart);
router.delete("/:id", validateToken, deleteFromCart);

export default router;
