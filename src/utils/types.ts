export interface OrderItemInput {
  product_id: string;
  quantity: number;
  price: number;
}

export interface CreateOrderInput {
  customer_name: string;
  customer_phone: string;
  items: OrderItemInput[];
}
