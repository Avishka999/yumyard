import { useContext } from 'react';
import CartContext from '../context/CartContextValue';

// Read cart state while enforcing provider usage.
function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
}

export default useCart;
