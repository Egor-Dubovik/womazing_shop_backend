import { Router } from "express";
import productController from "../controllers/productController.js";

const productRouter = new Router();

productRouter.post("/", productController.create);
productRouter.get("/", productController.getAll);
productRouter.get("/:id", productController.getOne);

export default productRouter;
