import { Router } from "express";
import productController from "../controllers/productController.js";
import checkRole from "../middleware/checkRoleMiddleware.js";

const productRouter = new Router();

productRouter.post("/", checkRole("ADMIN"), productController.create);
productRouter.get("/", productController.getAll);
productRouter.get("/:id", productController.getOne);

export default productRouter;
