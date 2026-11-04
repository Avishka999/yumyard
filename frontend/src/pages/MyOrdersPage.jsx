import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/common/ErrorMessage';
import Loading from '../components/common/Loading';
import { getOrders } from '../services/orderService';

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch(() => setError('We could not load your orders.'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="page-shell">
      <p className="eyebrow">Your Yum Yard journey</p>
      <h1>My orders</h1>
      <ErrorMessage message={error} />
      {isLoading ? <Loading message="Loading orders..." /> : (
        <div className="orders-list">
          {!orders.length && <p className="empty-state">You have not placed an order yet.</p>}
          {orders.map((order) => (
            <Link className="order-list-item" key={order.id} to={`/orders/${order.id}`}>
              <span>Order #{order.id}</span>
              <strong>Rs {Number(order.total).toFixed(2)}</strong>
              <small>{order.status}</small>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

export default MyOrdersPage;
