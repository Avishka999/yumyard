import axios from 'axios';

// Shared Axios client for every Laravel API request.
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

api.interceptors.request.use((config) => {
    // Attach the current Sanctum token when a user is signed in.
    const token = localStorage.getItem('yum-yard-token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;