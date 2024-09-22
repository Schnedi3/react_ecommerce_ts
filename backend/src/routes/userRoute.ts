import { Router } from "express";

import { getUsers, removeUser } from "../controllers/userController";

const router = Router();

router.get("/list", getUsers);
router.delete("/list/:id", removeUser);

export default router;
