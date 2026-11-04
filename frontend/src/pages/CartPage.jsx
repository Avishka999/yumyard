import { Link } from 'react-router-dom';
import FoodImage from '../components/foods/FoodImage';
import CartSummary from '../components/cart/CartSummary';
import useCart from '../hooks/useCart';

// Let customers review, adjust, or remove cart items before checkout.
function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <main className="page-shell cart-page">
      <p className="eyebrow">Ready when you are</p>
      <h1>Your cart</h1>
      {!cart.length ? (
        <section className="empty-panel">
          <span>🛒</span>
          <h2>Your cart is waiting for something delicious.</h2>
          <Link className="button" to="/foods">Browse menu</Link>
        </section>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <FoodImage food={item} />
                <div>
                  <h2>{item.name}</h2>
                  <p>Rs {Number(item.price).toFixed(2)}</p>
                  <div className="mini-quantity">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} type="button">−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} type="button">+</button>
                  </div>
                </div>
                <button aria-label={`Remove ${item.name}`} className="remove-button" onClick={() => removeFromCart(item.id)} type="button">×</button>
              </article>
            ))}
          </div>
          <div>
            <CartSummary items={cart} />
            <Link className="button checkout-button" to="/checkout">Continue to payment</Link>
          </div>
        </div>
      )}
    </main>
  );
}

export default CartPage;
