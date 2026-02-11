import { OrdersService } from "./orders.service.js";
// import * as service from "./orders.service";
export async function createOrder(req, res) {
    try {
        const data = await OrdersService.createOrder(req.body);
        res.json(data);
    }
    catch (e) {
        res.status(500).json(e);
    }
}
export async function getOrders(req, res) {
    const orders = await OrdersService.getOrders();
    res.json(orders);
}
export async function approve(req, res) {
    await OrdersService.approveOrder(req.params.id);
    res.json({ success: true });
}
