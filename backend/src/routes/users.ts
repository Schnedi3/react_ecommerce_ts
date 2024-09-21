import { Router } from "express";

import { listUsers, removeUser } from "../controllers/users_controller";

const router = Router();

router.get("/list", listUsers);
router.delete("/list/:id", removeUser);

export default router;
