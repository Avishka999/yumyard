import { useEffect, useState } from 'react';
import ErrorMessage from '../components/common/ErrorMessage';
import Loading from '../components/common/Loading';
import { getAdminOrders, updateOrderStatus } from '../services/adminService';

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getAdminOrders().then(setOrders).catch(() => setError('Unable to load orders.'));
  }, []);

  async function changeStatus(order, status) {
    try {
      const updated = await updateOrderStatus(order.id, { status, delivery_status: order.delivery_status || 'pending' });
      setOrders((current) => current.map((item) => item.id === updated.id ? updated : item));
    } catch {
      setError('Unable to update order status.');
    }
  }

  return (
    <main className="admin-page">
      <p className="eyebrow">Operations</p>
      <h1>Manage orders</h1>
      <ErrorMessage message={error} />
      {!orders.length && !error ? <Loading message="Loading orders..." /> : (
        <div className="admin-table">
          {orders.map((order) => (
            <div className="admin-table-row admin-order-row" key={order.id}>
              <strong>#{order.id} · {order.user?.name}</strong>
              <span>Rs {Number(order.total).toFixed(2)}</span>
              <select aria-label={`Status for order ${order.id}`} onChange={(event) => changeStatus(order, event.target.value)} value={order.status || 'pending'}>
                {['pending', 'confirmed', 'preparing', 'completed', 'cancelled'].map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default AdminOrdersPage;
