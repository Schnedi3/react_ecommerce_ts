import { Router } from "express";

import {
  addProduct,
  getProducts,
  getProduct,
  removeProduct,
} from "../controllers/productController";
import { upload } from "../middleware/multer";

const router = Router();

router.post("/", upload.array("images", 5), addProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.delete("/:id", removeProduct);

export default router;
