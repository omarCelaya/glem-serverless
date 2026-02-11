import { supabase } from "../../utils/supabase.js";
import { buildWhatsAppMessage } from "../../utils/whatsapp.js";
import { CreateOrderDTO } from "./orders.model.js";

export class OrdersService {

    static async createOrder(payload: CreateOrderDTO) {
        const { customer_name, customer_phone, items } = payload;

        const { data: order, error } = await supabase
            .from("orders")
            .insert({
                customer_name,
                customer_phone,
                status: "pending",
                sent_to_whatsapp: true
            })
            .select()
            .single();
        if (error || !order) throw error;

        const orderItems = items.map(item => ({
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price_snapshot: item.price
        }));

        await supabase.from("order_items").insert(orderItems);

        const whatsappUrl = await buildWhatsAppMessage(order.id);

        return { order, whatsappUrl };
    }

    static async getOrders() {
        const { data, error } = await supabase
            .from("orders")
            .select(`
      *,
      order_items(quantity, price_snapshot, products(name))
    `)
            .order("created_at", { ascending: false });

        if (error) throw error;
        return data;
    }

    static async approveOrder(id: string) {
        const { error } = await supabase
            .from("orders")
            .update({ status: "approved" })
            .eq("id", id);

        if (error) throw error;
    }
}