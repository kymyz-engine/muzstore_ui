import {
  createContext, useContext, useState,
  useCallback, useEffect, type ReactNode
} from "react";
import type { Product, CartDTO, CartItemDTO } from "../types";
import {
  fetchCart, apiAddItem, apiUpdateQuantity,
  apiRemoveItem, apiClearCart, apiAddRentItem, apiUpdateRentDays
} from "../api/cart";

interface CartContextType {
  items: CartItemDTO[];
  addItem: (product: Product) => void;
  removeItem: (productId: number, isRent?: boolean) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  updateRentDays: (productId: number, days: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isInCart: (productId: number) => boolean;
  addRentItem: (productId: number, rentDays: number) => void;
  isRented: (productId: number) => boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartDTO>({ id: 0, items: [], totalItems: 0, totalPrice: 0 });

  useEffect(() => {
    fetchCart().then(setCart).catch(console.error);
  }, []);

  const addItem = useCallback((product: Product) => {
    apiAddItem(product.id, 1).then(setCart).catch(console.error);
  }, []);

  // isRent=false — покупка, isRent=true — аренда
  // нужно разделять, т.к. один товар может быть в корзине дважды
  const removeItem = useCallback((productId: number, isRent = false) => {
    const item = cart.items.find(
      (i) => i.product.id === productId && Boolean(i.isRent) === isRent
    );
    if (!item) return;
    apiRemoveItem(item.id).then(setCart).catch(console.error);
  }, [cart.items]);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    const item = cart.items.find((i) => i.product.id === productId && !i.isRent);
    if (!item) return;
    if (quantity <= 0) {
      apiRemoveItem(item.id).then(setCart).catch(console.error);
    } else {
      apiUpdateQuantity(item.id, quantity).then(setCart).catch(console.error);
    }
  }, [cart.items]);

  const updateRentDays = useCallback((productId: number, days: number) => {
    const item = cart.items.find((i) => i.product.id === productId && i.isRent);
    if (!item) return;
    if (days <= 0) {
      apiRemoveItem(item.id).then(setCart).catch(console.error);
    } else {
      apiUpdateRentDays(item.id, days).then(setCart).catch(console.error);
    }
  }, [cart.items]);

  const clearCart = useCallback(() => {
    apiClearCart().then(() =>
      setCart({ id: 0, items: [], totalItems: 0, totalPrice: 0 })
    ).catch(console.error);
  }, []);

  const isInCart = useCallback(
    (productId: number) => cart.items.some((i) => i.product.id === productId && !i.isRent),
    [cart.items],
  );

  const addRentItem = useCallback((productId: number, rentDays: number) => {
    apiAddRentItem(productId, rentDays).then(setCart).catch(console.error);
  }, []);

  const isRented = useCallback(
    (productId: number) => cart.items.some((i) => i.product.id === productId && i.isRent),
    [cart.items]
  );

  return (
    <CartContext.Provider value={{
      items: cart.items,
      addItem,
      removeItem,
      updateQuantity,
      updateRentDays,
      clearCart,
      totalItems: cart.totalItems,
      totalPrice: cart.totalPrice,
      isInCart,
      addRentItem,
      isRented,
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