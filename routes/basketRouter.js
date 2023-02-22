import { Router } from "express";
import basketController from "../controllers/basketController.js";

const basketRouter = new Router();

basketRouter.post("/", basketController.createProduct);
basketRouter.get("/:basketId", basketController.getAllProduct);
basketRouter.get("/", basketController.getBasketInfo);
// basketRouter.get("/:id", basketController.getOne);
basketRouter.delete("/:basketId", basketController.getAllProduct);

export default basketRouter;
