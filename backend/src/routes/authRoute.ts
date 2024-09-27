import { Router } from "express";

import { validateSchema } from "../middleware/validateAuth";
import { registerSchema, loginSchema } from "../schemas/authSchema";
import {
  registerUser,
  loginUser,
  loginGoogle,
  loginAdmin,
} from "../controllers/authController";

const router = Router();

// admin
router.post("/admin", validateSchema(loginSchema), loginAdmin);

// user
router.post("/register", validateSchema(registerSchema), registerUser);
router.post("/login", validateSchema(loginSchema), loginUser);
router.post("/google", loginGoogle);

export default router;
