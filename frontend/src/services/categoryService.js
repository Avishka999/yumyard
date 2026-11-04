import api from './api';

// Read the public category catalog.
export async function getCategories() {
  const response = await api.get('/categories');

  return response.data;
}

// Create a category through the protected admin API.
export async function createCategory(categoryData) {
  const response = await api.post('/categories', categoryData);

  return response.data;
}
