import {
  createContext, useContext, useState,
  useCallback, useEffect, type ReactNode
} from "react";
import type { Product, CartDTO, CartItemDTO } from "../types";
import {
  fetchCart, apiAddItem, apiUpdateQuantity,
  apiRemoveItem, apiClearCart
} from "../api/cart";

interface CartContextType {
  items: CartItemDTO[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isInCart: (productId: number) => boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartDTO>({ id: 0, items: [], totalItems: 0, totalPrice: 0 });

  // загружаем корзину при старте
  useEffect(() => {
    fetchCart().then(setCart).catch(console.error);
  }, []);

  const addItem = useCallback((product: Product) => {
    apiAddItem(product.id, 1).then(setCart).catch(console.error);
  }, []);

  const removeItem = useCallback((productId: number) => {
    const item = cart.items.find((i) => i.product.id === productId);
    if (!item) return;
    apiRemoveItem(item.id).then(setCart).catch(console.error);
  }, [cart.items]);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    const item = cart.items.find((i) => i.product.id === productId);
    if (!item) return;
    if (quantity <= 0) {
      apiRemoveItem(item.id).then(setCart).catch(console.error);
    } else {
      apiUpdateQuantity(item.id, quantity).then(setCart).catch(console.error);
    }
  }, [cart.items]);

  const clearCart = useCallback(() => {
    apiClearCart().then(() =>
      setCart({ id: 0, items: [], totalItems: 0, totalPrice: 0 })
    ).catch(console.error);
  }, []);

  const isInCart = useCallback(
    (productId: number) => cart.items.some((i) => i.product.id === productId),
    [cart.items],
  );

  return (
    <CartContext.Provider value={{
      items: cart.items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems: cart.totalItems,
      totalPrice: cart.totalPrice,
      isInCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}