import { createContext, useEffect, useState, useCallback } from 'react';
import API from '../api/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('auth.user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() =>
    sessionStorage.getItem('auth.token')
  );

  // ✅ STABLE LOGOUT
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem('auth.user');
    sessionStorage.removeItem('auth.token');
  }, []);

  // ✅ FETCH USER ONLY ONCE IF TOKEN EXISTS
  useEffect(() => {
    if (!token || user) return;

    API.get('/auth/me')
      .then(res => {
        setUser(res.data.user);
        sessionStorage.setItem(
          'auth.user',
          JSON.stringify(res.data.user)
        );
      })
      .catch(() => {
        logout();
      });
  }, [token, user, logout]);

  const login = ({ token, user }) => {
    setToken(token);
    setUser(user);
    sessionStorage.setItem('auth.token', token);
    sessionStorage.setItem('auth.user', JSON.stringify(user));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
