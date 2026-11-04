import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link className="brand" to="/admin">Yum Yard Admin</Link>
        <nav aria-label="Admin navigation" className="admin-navigation">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/categories">Categories</Link>
          <Link to="/admin/foods">Foods</Link>
          <Link to="/admin/orders">Orders</Link>
        </nav>
      </aside>
      <section className="admin-content">
        <Outlet />
      </section>
    </div>
  );
}

export default AdminLayout;
