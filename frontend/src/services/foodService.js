import api from './api';

// Read menu items for customer browsing and admin management.
export async function getFoods(params = {}) {
  const response = await api.get('/foods', { params });
  return response.data;
}

// Read one menu item for its detail page.
export async function getFood(id) {
  const response = await api.get(`/foods/${id}`);
  return response.data;
}

// Create a menu item from the admin form.
export async function createFood(foodData) {
  const response = await api.post('/foods', foodData);
  return response.data;
}
