import { Router } from "express";

import {
  addOrder,
  getOrders,
  getOrder,
  updateStatus,
} from "../controllers/orderController";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// admin
router.get("/", validateToken, getOrders);
router.get("/:id", validateToken, getOrder);
router.post("/:id", validateToken, updateStatus);

// user
router.post("/", validateToken, addOrder);

export default router;
