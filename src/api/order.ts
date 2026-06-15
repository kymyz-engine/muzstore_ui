import request from "./client";

export interface CreateOrderDTO {
  name: string;
  phone: string;
  email: string;
  address: string;
  comment: string;
  deliveryType: "courier" | "pickup";
}

export interface OrderDTO {
  id: number;
  status: string;
  totalPrice: number;
  deliveryType: string;
}

export function createOrder(dto: CreateOrderDTO): Promise<OrderDTO> {
  return request<OrderDTO>("/orders", "POST", dto);
}