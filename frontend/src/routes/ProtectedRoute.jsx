import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// Redirect signed-out users to login and remember their destination.
function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate state={{ from: location }} to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
