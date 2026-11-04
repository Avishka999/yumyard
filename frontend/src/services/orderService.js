import api from './api';

// Load the authenticated customer's order history.
export async function getOrders() {
  const response = await api.get('/orders');
  return response.data;
}

// Load one customer-owned order.
export async function getOrder(id) {
  const response = await api.get(`/orders/${id}`);
  return response.data;
}

// Submit the customer's cart and delivery details.
export async function createOrder(orderData) {
  const response = await api.post('/orders', orderData);
  return response.data;
}
