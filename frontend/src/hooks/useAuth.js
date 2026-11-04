import { useContext } from 'react';
import AuthContext from '../context/AuthContextValue';

// Read authentication state while enforcing provider usage.
function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

export default useAuth;
