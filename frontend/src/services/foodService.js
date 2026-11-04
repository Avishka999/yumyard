import api from './api';

export async function getFoods(params = {}) {
  const response = await api.get('/foods', { params });
  return response.data;
}

export async function getFood(id) {
  const response = await api.get(`/foods/${id}`);
  return response.data;
}

export async function createFood(foodData) {
  const response = await api.post('/foods', foodData);
  return response.data;
}
