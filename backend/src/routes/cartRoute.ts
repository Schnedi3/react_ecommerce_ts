import { Router } from "express";

import {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
} from "../controllers/cartController";
import { validateToken } from "../middleware/validateToken";

const router = Router();

router.get("/get", validateToken, getCart);
router.post("/add", validateToken, addToCart);
router.put("/update", validateToken, updateCart);
router.delete("/delete", validateToken, removeFromCart);

export default router;
