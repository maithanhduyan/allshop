import { signal } from "@preact/signals";
import type { CartItem } from "./types.ts";

export const cartItems = signal<CartItem[]>([]);

export function addToCart(item: CartItem) {
  const items = [...cartItems.value];
  const existing = items.find((i) => i.productId === item.productId);
  if (existing) {
    existing.quantity = Math.min(
      existing.quantity + item.quantity,
      existing.stock,
    );
    cartItems.value = items;
  } else {
    cartItems.value = [...items, item];
  }
}

export function removeFromCart(productId: string) {
  cartItems.value = cartItems.value.filter((i) => i.productId !== productId);
}

export function updateCartQuantity(productId: string, quantity: number) {
  const items = [...cartItems.value];
  const item = items.find((i) => i.productId === productId);
  if (item) {
    item.quantity = Math.max(1, Math.min(quantity, item.stock));
    cartItems.value = items;
  }
}

export function clearCart() {
  cartItems.value = [];
}

export function getCartTotal(): number {
  return cartItems.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
}

export function getCartCount(): number {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
}
