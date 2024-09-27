import { Router } from "express";

import {
  addProduct,
  getProducts,
  getProduct,
  removeProduct,
} from "../controllers/productController";
import { validateToken } from "../middleware/validateToken";
import { upload } from "../middleware/multer";

const router = Router();

// admin
router.post("/", validateToken, upload.array("images", 5), addProduct);
router.get("/", validateToken, getProducts);
router.get("/:id", validateToken, getProduct);
router.delete("/:id", validateToken, removeProduct);

export default router;
