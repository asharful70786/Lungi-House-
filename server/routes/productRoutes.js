import express from "express";
const router = express.Router();
import checkAuthMiddleWare from "../middleWare/checkAuthMiddleWare.js";
import { deleteProduct, getIndividualProduct, getProducts, updateProduct, upload_Product_with_Image } from "../controllers/productController.js";
import upload from "../config/uploadConfig.js";
import multer  from "multer";


router.get("/", getProducts);
router.get("/get/:id", getIndividualProduct);


router.put("/update/:id", checkAuthMiddleWare, updateProduct);

router.delete("/delete/:id", checkAuthMiddleWare, deleteProduct);

router.post("/upload", checkAuthMiddleWare, upload.single("image"), upload_Product_with_Image );

export default router;