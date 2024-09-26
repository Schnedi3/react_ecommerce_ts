import { Router } from "express";

import { getUsers, getUser, removeUser } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.delete("/:id", removeUser);

export default router;
