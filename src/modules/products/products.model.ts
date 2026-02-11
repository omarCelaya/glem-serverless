import { z } from "zod";

export const createProductSchema = z.object({
  product_code: z.string().optional(),
  name: z.string().min(1),
  description: z.string().optional(),
  quantity: z.number().int().nonnegative(),
  purchase_price: z.number().nonnegative(),
  sale_price: z.number().nonnegative(),
  location: z.string(),
  classification: z.string()
});

export type CreateProductDTO = z.infer<typeof createProductSchema>;
