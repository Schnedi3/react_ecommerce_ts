import { Router } from "express";

import {
  getUsers,
  getUser,
  deleteUser,
  updateUsername,
} from "../controllers/userController";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// admin
router.get("/", validateToken, getUsers);
router.get("/:id", validateToken, getUser);
router.delete("/:id", validateToken, deleteUser);

// user
router.put("/:id", validateToken, updateUsername);

export default router;
