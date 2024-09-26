import { Router } from "express";

import {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
} from "../controllers/cartController";
import { validateToken } from "../middleware/validateToken";

const router = Router();

router.get("/", validateToken, getCart);
router.post("/:id", validateToken, addToCart);
router.put("/:id", validateToken, updateCart);
router.delete("/:id", validateToken, removeFromCart);

export default router;
