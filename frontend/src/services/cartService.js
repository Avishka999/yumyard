const CART_STORAGE_KEY = 'yum-yard-cart';

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

export function storeCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}
