import api from './api';

export async function getDashboard() {
  const response = await api.get('/admin/dashboard');
  return response.data;
}

export async function getAdminOrders() {
  const response = await api.get('/admin/orders');
  return response.data;
}

export async function updateOrderStatus(id, statusData) {
  const response = await api.patch(`/admin/orders/${id}/status`, statusData);
  return response.data;
}
