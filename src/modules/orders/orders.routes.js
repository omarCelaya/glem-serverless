import { Router } from "express";
import { approve, createOrder, getOrders } from "./orders.controller.js";
import { validateRequest } from "../../utils/validateRequest.js";
import { createOrderSchema } from "./orders.model.js";
const ordersRouter = Router();
ordersRouter.post("/", validateRequest(createOrderSchema), createOrder); // público
ordersRouter.get("/", getOrders); // admin
ordersRouter.patch("/:id/approve", approve);
export default ordersRouter;
