import { Router } from "express";

import {
  createCheckoutSession,
  getCheckoutSession,
} from "../controllers/paymentController";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// user
router.post("/checkout-session", validateToken, createCheckoutSession);
router.get("/checkout-session", validateToken, getCheckoutSession);

export default router;
