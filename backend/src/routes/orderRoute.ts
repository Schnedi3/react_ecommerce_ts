import { Router } from "express";

import {
  addOrder,
  addStripeOrder,
  getOrders,
  getUserOrders,
  updateStatus,
  deleteOrder,
} from "../controllers/orderController";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// admin
router.get("/", validateToken, getOrders);
router.put("/:id", validateToken, updateStatus);
router.delete("/:id", validateToken, deleteOrder);

// user
router.post("/", validateToken, addOrder);
router.post("/stripe", validateToken, addStripeOrder);
router.get("/user", validateToken, getUserOrders);

export default router;
