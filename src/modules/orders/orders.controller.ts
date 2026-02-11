import { Request, Response } from "express";
import { OrdersService } from "./orders.service.js";
// import * as service from "./orders.service";

export async function createOrder(req: Request, res: Response) {
    try {
        const data = await OrdersService.createOrder(req.body);
        res.json(data);
    } catch (e) {
        res.status(500).json(e);
    }
}
export async function getOrders(req: Request, res: Response) {
    const orders = await OrdersService.getOrders();
    res.json(orders);
}

export async function approve(req: Request, res: Response) {
    await OrdersService.approveOrder(req.params.id as string);
    res.json({ success: true });
}
