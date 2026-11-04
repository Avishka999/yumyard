import { Route, Routes } from 'react-router-dom';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import AdminCategoriesPage from '../pages/AdminCategoriesPage';
import AdminFoodsPage from '../pages/AdminFoodsPage';
import AdminOrdersPage from '../pages/AdminOrdersPage';
import AdminLayout from '../layouts/AdminLayout';
import CartPage from '../pages/CartPage';
import CategoriesPage from '../pages/CategoriesPage';
import CheckoutPage from '../pages/CheckoutPage';
import CustomerLayout from '../layouts/CustomerLayout';
import FoodDetailsPage from '../pages/FoodDetailsPage';
import FoodsPage from '../pages/FoodsPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import MyOrdersPage from '../pages/MyOrdersPage';
import NotFoundPage from '../pages/NotFoundPage';
import OrderDetailsPage from '../pages/OrderDetailsPage';
import PaymentSuccessPage from '../pages/PaymentSuccessPage';
import RegisterPage from '../pages/RegisterPage';
import AdminRoute from './AdminRoute';
import ProtectedRoute from './ProtectedRoute';

// Define customer, protected customer, and admin route groups.
function AppRoutes() {
  return (
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/foods" element={<FoodsPage />} />
        <Route path="/burgers" element={<FoodsPage />} />
        <Route path="/drinks" element={<FoodsPage />} />
        <Route path="/salads" element={<FoodsPage />} />
        <Route path="/foods/:foodId" element={<FoodDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<MyOrdersPage />} />
          <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
        </Route>
      </Route>
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/categories" element={<AdminCategoriesPage />} />
          <Route path="/admin/foods" element={<AdminFoodsPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
