import { Router } from "express";
import userRouter from "./userRouter.js";
import productRouter from "./productRouter.js";
import typeRouter from "./typeRouter.js";
import brandRouter from "./brandRouter.js";

const router = new Router();

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);

export default router;
