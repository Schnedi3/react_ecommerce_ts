import { Router } from "express";

import {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
} from "../controllers/productController";
import { validateToken } from "../middleware/validateToken";
import { upload } from "../middleware/multer";

const router = Router();

// admin
router.post("/", validateToken, upload.array("images", 5), addProduct);
router.delete("/:id", validateToken, deleteProduct);

// user
router.get("/", getProducts);
router.get("/:id", getProduct);

export default router;
