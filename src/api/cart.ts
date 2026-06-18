import request from "./client";
import type { CartDTO } from "../types";

export function fetchCart(): Promise<CartDTO> {
    return request<CartDTO>("/cart");
}

export function apiAddItem(productId: number, quantity: number): Promise<CartDTO> {
  return request<CartDTO>(`/cart/items?productId=${productId}&quantity=${quantity}`, "POST");
}

export function apiUpdateQuantity(itemId: number, quantity: number): Promise<CartDTO> {
  return request<CartDTO>(`/cart/items/${itemId}?quantity=${quantity}`, "PUT");
}

export function apiRemoveItem(itemId: number): Promise<CartDTO> {
  return request<CartDTO>(`/cart/items/${itemId}`, "DELETE");
}

export function apiClearCart(): Promise<void> {
  return request<void>("/cart", "DELETE");
}

export function apiAddRentItem(productId: number, rentDays: number): Promise<CartDTO> {
  return request<CartDTO>(`/cart/rent?productId=${productId}&rentDays=${rentDays}`, "POST");
}

export function apiUpdateRentDays(itemId: number, days: number): Promise<CartDTO> {
  return request<CartDTO>(`/cart/items/${itemId}/rent?days=${days}`, "PUT");
}