import api from './api';

export async function login(credentials) {
  const response = await api.post('/login', credentials);

  if (response.data.token) {
    localStorage.setItem('yum-yard-token', response.data.token);
  }

  return response.data;
}

export async function register(userData) {
  const response = await api.post('/register', userData);

  if (response.data.token) {
    localStorage.setItem('yum-yard-token', response.data.token);
  }

  return response.data;
}

export async function logout() {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (requestError) {
    if (requestError.response?.status !== 401) {
      throw requestError;
    }

    return { message: 'Session already expired.' };
  } finally {
    localStorage.removeItem('yum-yard-token');
  }
}
