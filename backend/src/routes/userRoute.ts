import { Router } from "express";

import { getUsers, getUser, removeUser } from "../controllers/userController";

const router = Router();

router.get("/list", getUsers);
router.get("/list/:id", getUser);
router.delete("/list/:id", removeUser);

export default router;
