import { useCart } from "@/hooks/useCart";
import type { CartItem, MenuItem, MenuItemVariant } from "@/types";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

interface CartContextValue {
  items: CartItem[];
  addItem: (menuItem: MenuItem, variant: MenuItemVariant) => void;
  removeItem: (menuItemId: string, variantLabel: string) => void;
  updateQuantity: (
    menuItemId: string,
    variantLabel: string,
    quantity: number,
  ) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCartContext(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
}
