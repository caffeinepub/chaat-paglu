import type { CartItem, MenuItem, MenuItemVariant } from "@/types";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "chaat-paglu-cart";

function loadCart(): CartItem[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addItem = useCallback(
    (menuItem: MenuItem, variant: MenuItemVariant) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) =>
            i.menuItem.id === menuItem.id && i.variant.label === variant.label,
        );
        if (existing) {
          return prev.map((i) =>
            i.menuItem.id === menuItem.id && i.variant.label === variant.label
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          );
        }
        return [...prev, { menuItem, variant, quantity: 1 }];
      });
    },
    [],
  );

  const removeItem = useCallback((menuItemId: string, variantLabel: string) => {
    setItems((prev) =>
      prev.filter(
        (i) =>
          !(i.menuItem.id === menuItemId && i.variant.label === variantLabel),
      ),
    );
  }, []);

  const updateQuantity = useCallback(
    (menuItemId: string, variantLabel: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(menuItemId, variantLabel);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.menuItem.id === menuItemId && i.variant.label === variantLabel
            ? { ...i, quantity }
            : i,
        ),
      );
    },
    [removeItem],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = items.reduce(
    (sum, i) => sum + i.variant.price * i.quantity,
    0,
  );
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    totalItems,
  };
}
