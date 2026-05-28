import request from "./client";
import type { Product } from "../types";

export interface ProductsParams {
  category?: string;
  brand?: string;
  priceMin?: number;
  priceMax?: number;
  sort?: string;
}

export function fetchProducts(params: ProductsParams = {}): Promise<Product[]> {
  const q = new URLSearchParams();
  if (params.category) q.set("category", params.category);
  if (params.brand)    q.set("brand", params.brand);
  if (params.priceMin) q.set("priceMin", String(params.priceMin));
  if (params.priceMax) q.set("priceMax", String(params.priceMax));
  if (params.sort)     q.set("sort", params.sort);

  const qs = q.toString();
  return request<Product[]>(`/products${qs ? "?" + qs : ""}`);
}

export function fetchProduct(id: number): Promise<Product> {
  return request<Product>(`/products/${id}`);
}