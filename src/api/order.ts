import request from "./client";

export interface OrderRequest {
  name: string;
  phone: string;
  email: string;
  address: string;
  comment: string;
  deliveryType: string;
}

export interface OrderItemResponse {
  id: number;
  productName: string;
  productBrand: string | null;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface OrderResponse {
  id: number;
  status: string;
  phone: string;
  email: string;
  address: string;
  deliveryType: string;
  totalPrice: number;
  items: OrderItemResponse[];
}

export function createOrder(data: OrderRequest): Promise<OrderResponse> {
  return request<OrderResponse>("/orders", "POST", data);
}

export function fetchOrders(): Promise<OrderResponse[]> {
  return request<OrderResponse[]>("/orders");
}