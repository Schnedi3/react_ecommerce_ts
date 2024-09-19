import { Router } from "express";

import { validateSchema } from "../middleware/validateAuth";
import { registerSchema, loginSchema } from "../schemas/auth_schema";
import {
  registerUser,
  loginUser,
  loginAdmin,
} from "../controllers/auth_controller";

const router = Router();

router.post("/register", validateSchema(registerSchema), registerUser);
router.post("/login", validateSchema(loginSchema), loginUser);
router.post("/admin", validateSchema(loginSchema), loginAdmin);

export default router;
