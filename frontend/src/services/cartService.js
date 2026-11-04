const CART_STORAGE_KEY = 'yum-yard-cart';

// Restore the cart saved by the previous browser session.
export function getStoredCart() {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!storedCart) {
    return [];
  }

  try {
    return JSON.parse(storedCart);
  } catch {
    localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  }
}

// Persist the latest cart state after every cart change.
export function storeCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}
