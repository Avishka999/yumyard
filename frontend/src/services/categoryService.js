import api from './api';

export async function getCategories() {
  const response = await api.get('/categories');

  return response.data;
}

export async function createCategory(categoryData) {
  const response = await api.post('/categories', categoryData);

  return response.data;
}
