import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../components/common/ErrorMessage';
import Loading from '../components/common/Loading';
import { getOrder } from '../services/orderService';

// Display the line items and delivery state for one customer order.
function OrderDetailsPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getOrder(orderId).then(setOrder).catch(() => setError('We could not load this order.'));
  }, [orderId]);

  if (error) return <main className="page-shell"><ErrorMessage message={error} /><Link to="/orders">Back to orders</Link></main>;
  if (!order) return <Loading message="Loading order..." />;

  return (
    <main className="page-shell">
      <Link className="back-link" to="/orders">← Back to orders</Link>
      <p className="eyebrow">Order #{order.id}</p>
      <h1>Thanks for ordering!</h1>
      <section className="order-summary-card">
        <h2>Delivery status: {order.delivery_status}</h2>
        {order.items.map((item) => <div key={item.id}><span>{item.food.name} × {item.quantity}</span><strong>Rs {Number(item.unit_price).toFixed(2)}</strong></div>)}
        <div className="summary-total"><span>Total</span><strong>Rs {Number(order.total).toFixed(2)}</strong></div>
      </section>
    </main>
  );
}

export default OrderDetailsPage;
