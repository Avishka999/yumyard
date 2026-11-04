import { useEffect, useMemo, useState } from 'react';
import CartContext from './CartContextValue';
import { getStoredCart, storeCart } from '../services/cartService';

function CartProvider({ children }) {
  const [cart, setCart] = useState(getStoredCart);

  useEffect(() => {
    storeCart(cart);
  }, [cart]);

  function addToCart(food) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === food.id);

      if (existingItem) {
        return currentCart.map((item) => item.id === food.id
          ? { ...item, quantity: item.quantity + 1 }
          : item);
      }

      return [...currentCart, { ...food, quantity: 1 }];
    });
  }

  function removeFromCart(foodId) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== foodId));
  }

  function updateQuantity(foodId, quantity) {
    setCart((currentCart) => currentCart
      .map((item) => item.id === foodId ? { ...item, quantity } : item)
      .filter((item) => item.quantity > 0));
  }

  const value = useMemo(() => ({ cart, addToCart, removeFromCart, updateQuantity }), [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
