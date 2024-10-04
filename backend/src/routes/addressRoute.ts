import { Router } from "express";

import {
  getAddress,
  addAddress,
  deleteAddress,
} from "../controllers/addressController";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// user
router.get("/", validateToken, getAddress);
router.post("/", validateToken, addAddress);
router.delete("/:id", validateToken, deleteAddress);

export default router;
