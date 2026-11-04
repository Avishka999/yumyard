import { useMemo, useState } from 'react';
import AuthContext from './AuthContextValue';
import { login as loginRequest, logout as logoutRequest, register as registerRequest } from '../services/authService';

// Provide authentication state and actions to the entire React tree.
function AuthProvider({ children }) {
  // Restore the last known user for refresh-safe navigation.
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('yum-yard-user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  async function login(credentials) {
    const response = await loginRequest(credentials);
    setUser(response.user);
    localStorage.setItem('yum-yard-user', JSON.stringify(response.user));
    return response;
  }

  async function register(userData) {
    const response = await registerRequest(userData);
    setUser(response.user);
    localStorage.setItem('yum-yard-user', JSON.stringify(response.user));
    return response;
  }

  async function logout() {
    try {
      await logoutRequest();
    } finally {
      setUser(null);
      localStorage.removeItem('yum-yard-user');
      localStorage.removeItem('yum-yard-token');
    }
  }

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
