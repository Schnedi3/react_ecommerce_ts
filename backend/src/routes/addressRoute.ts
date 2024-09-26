import { Router } from "express";

import {
  getAddress,
  addAddress,
  removeAddress,
} from "../controllers/addressController";
import { validateToken } from "../middleware/validateToken";

const router = Router();

router.get("/", validateToken, getAddress);
router.post("/", validateToken, addAddress);
router.delete("/:id", validateToken, removeAddress);

export default router;
