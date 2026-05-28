export interface Product {
  id: number;
  name: string;
  brand: string;
  category: CategoryId;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  specs: Record<string, string>;
  description: string;
  badge?: "new" | "sale" | "hit";
}

export type CategoryId = string;

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  count: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SortOption = "price-asc" | "price-desc" | "rating" | "name";
