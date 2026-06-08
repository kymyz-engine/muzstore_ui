import request from "./client";

export interface CreateOrderDTO {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  district: string;
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