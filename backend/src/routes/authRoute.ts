import { Router } from "express";

import { validateSchema } from "../middleware/validateAuth";
import { registerSchema, loginSchema } from "../schemas/authSchema";
import {
  loginGoogle,
  login,
  register,
  logout,
  resetPassword,
  tokenController,
} from "../controllers/authController";

const router = Router();

router.post("/google", loginGoogle);
router.post("/login", validateSchema(loginSchema), login);
router.post("/register", validateSchema(registerSchema), register);
router.post("/logout", logout);
router.put("/reset-password", validateSchema(loginSchema), resetPassword);

// both
router.post("/refresh-token", tokenController);

export default router;
