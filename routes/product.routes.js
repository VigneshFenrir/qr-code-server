import { Router } from "express";
import controller from "../controller/product.controller.js";

const router = Router();

router.post("/create", controller.createProduct);
router.get("/get", controller.getProduct);
router.get("/getAll", controller.getProducts);
router.delete("/delete", controller.deleteProduct);

export default router;
