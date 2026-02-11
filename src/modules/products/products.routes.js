import { Router } from "express";
import { createProduct, getPublicProducts } from "./products.controller.js";
import { createProductSchema } from "./products.model.js";
import { validateRequest } from "../../utils/validateRequest.js";
const productRouter = Router();
productRouter.get("/", getPublicProducts); // público
productRouter.post("/", validateRequest(createProductSchema), createProduct); // admin
export default productRouter;
