import { z } from "zod";

export const orderItemSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.number().int().positive(),
  price: z.number().positive()
});

export const createOrderSchema = z.object({
  customer_name: z.string().min(1),
  customer_phone: z.string().min(10),
  items: z.array(orderItemSchema).min(1)
});

export type CreateOrderDTO = z.infer<typeof createOrderSchema>;
