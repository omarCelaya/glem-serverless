import { supabase } from "./supabase.js";

export async function buildWhatsAppMessage(orderId: string) {
  const { data } = await supabase
    .from("order_items")
    .select("quantity, price_snapshot, products(name)")
    .eq("order_id", orderId);

  let total = 0;

  let text = `Nuevo pedido 📦\n\nFolio: ${orderId}\n\nProductos:\n`;

  data?.forEach((item: any) => {
    const subtotal = item.quantity * item.price_snapshot;
    total += subtotal;

    text += `- ${item.products.name} x${item.quantity} ($${subtotal})\n`;
  });

  text += `\nTotal: $${total}`;

  return `https://wa.me/${process.env.WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}
