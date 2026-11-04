import { useEffect, useState } from 'react';
import DashboardStats from '../components/dashboard/DashboardStats';
import ErrorMessage from '../components/common/ErrorMessage';
import Loading from '../components/common/Loading';
import { getDashboard } from '../services/adminService';

function AdminDashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboard().then(setDashboard).catch(() => setError('Unable to load dashboard statistics.'));
  }, []);

  const statistics = dashboard ? [
    { label: 'Total orders', value: dashboard.total_orders },
    { label: 'Foods', value: dashboard.total_foods },
    { label: 'Categories', value: dashboard.total_categories },
    { label: 'Customers', value: dashboard.total_customers },
    { label: 'Pending orders', value: dashboard.pending_orders },
    { label: 'Sales total', value: `Rs ${Number(dashboard.sales_total).toFixed(2)}` },
  ] : [];

  return (
    <main className="admin-page">
      <p className="eyebrow">Overview</p>
      <h1>Admin dashboard</h1>
      <ErrorMessage message={error} />
      {dashboard ? <DashboardStats statistics={statistics} /> : <Loading message="Loading dashboard..." />}
    </main>
  );
}

export default AdminDashboardPage;
