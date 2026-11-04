import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// Allow only authenticated administrator users into the admin area.
function AdminRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/categories" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
