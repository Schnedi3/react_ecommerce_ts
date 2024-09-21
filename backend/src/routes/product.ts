import { Router } from "express";

import {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
} from "../controllers/prod_controller";
import { upload } from "../middleware/multer";

const router = Router();

router.post("/add", upload.array("images", 5), addProduct);
router.get("/list", listProduct);
router.delete("/list/:id", removeProduct);
router.get("/list/:id", singleProduct);

export default router;
 