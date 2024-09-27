import { Router } from "express";

import { getUsers, getUser, deleteUser } from "../controllers/userController";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// admin
router.get("/", validateToken, getUsers);
router.get("/:id", validateToken, getUser);
router.delete("/:id", validateToken, deleteUser);

export default router;
