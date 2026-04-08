export interface MenuItemVariant {
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
  variants: MenuItemVariant[];
}

export interface CartItem {
  menuItem: MenuItem;
  variant: MenuItemVariant;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerName: string;
  phone: string;
  subtotal: number;
  placedAt: string;
}

export interface Feedback {
  orderId: string;
  rating: number;
  comment: string;
  submittedAt: string;
}
