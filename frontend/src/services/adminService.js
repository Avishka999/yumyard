import api from './api';

// Load dashboard totals for an administrator.
export async function getDashboard() {
  const response = await api.get('/admin/dashboard');
  return response.data;
}

// Load all orders for operational management.
export async function getAdminOrders() {
  const response = await api.get('/admin/orders');
  return response.data;
}

// Update the workflow status of one order.
export async function updateOrderStatus(id, statusData) {
  const response = await api.patch(`/admin/orders/${id}/status`, statusData);
  return response.data;
}
