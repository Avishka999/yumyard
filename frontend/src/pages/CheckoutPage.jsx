import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { createOrder } from '../services/orderService';

// Collect delivery details and submit the cart as an authenticated order.
function CheckoutPage() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('mastercard');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const deliveryFee = cart.length ? 400 : 0;
  const total = subtotal + deliveryFee;

  async function handlePayment(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await createOrder({
        delivery_address: deliveryAddress,
        phone,
        items: cart.map((item) => ({ food_id: item.id, quantity: item.quantity })),
      });
      navigate('/payment-success');
    } catch {
      setError('We could not place your order. Please check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!cart.length) {
    return <main className="page-shell"><h1>Your cart is empty</h1><Link to="/foods">Return to menu</Link></main>;
  }

  return (
    <main className="page-shell payment-page">
      <Link className="back-link" to="/cart">← Back to cart</Link>
      <p className="eyebrow">Almost there</p>
      <h1>Payment</h1>
      <div className="payment-layout">
        <section className="order-summary-card">
          <h2>Order summary</h2>
          <div><span>Order</span><strong>Rs {subtotal.toFixed(2)}</strong></div>
          <div><span>Delivery fee</span><strong>Rs {deliveryFee.toFixed(2)}</strong></div>
          <div className="summary-total"><span>Total</span><strong>Rs {total.toFixed(2)}</strong></div>
          <p>Estimated delivery: 15–30 mins</p>
        </section>
        <form className="payment-form" onSubmit={handlePayment}>
          <h2>Payment method</h2>
          {error && <p className="status-message status-message--error">{error}</p>}
          <label className="form-field" htmlFor="delivery-address">
            <span>Delivery address</span>
            <textarea id="delivery-address" onChange={(event) => setDeliveryAddress(event.target.value)} required rows="3" value={deliveryAddress} />
          </label>
          <label className="form-field" htmlFor="delivery-phone">
            <span>Phone number</span>
            <input id="delivery-phone" onChange={(event) => setPhone(event.target.value)} required type="tel" value={phone} />
          </label>
          {['mastercard', 'visa'].map((method) => (
            <label className={paymentMethod === method ? 'payment-option payment-option--active' : 'payment-option'} key={method}>
              <input checked={paymentMethod === method} name="payment" onChange={() => setPaymentMethod(method)} type="radio" value={method} />
              <span className={`card-logo card-logo--${method}`}>{method === 'visa' ? 'VISA' : '●●'}</span>
              <span><strong>{method === 'visa' ? 'Debit card' : 'Credit card'}</strong><small>4200 **** **** 7890</small></span>
            </label>
          ))}
          <label className="save-card"><input type="checkbox" /> Save card details</label>
          <button className="button button--dark pay-button" disabled={isSubmitting} type="submit">{isSubmitting ? 'Placing order...' : `Pay Rs ${total.toFixed(2)}`}</button>
        </form>
      </div>
    </main>
  );
}

export default CheckoutPage;
