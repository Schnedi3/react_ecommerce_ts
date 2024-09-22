import { Router } from "express";

import {
  addProduct,
  getProducts,
  removeProduct,
  singleProduct,
} from "../controllers/productController";
import { upload } from "../middleware/multer";

const router = Router();

router.post("/add", upload.array("images", 5), addProduct);
router.get("/list", getProducts);
router.delete("/list/:id", removeProduct);
router.get("/list/:id", singleProduct);

export default router;
 