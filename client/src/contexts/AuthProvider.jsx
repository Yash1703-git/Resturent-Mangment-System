import React, { useState, useEffect, useCallback } from 'react';
import AuthContext from './AuthContext';
import API from '../api/api';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('auth.user'))
  );
  const [token, setToken] = useState(
    localStorage.getItem('auth.token')
  );

  // ✅ declare logout FIRST and stabilize it
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth.user');
    localStorage.removeItem('auth.token');
  }, []);

  // ✅ effect with correct dependencies
  useEffect(() => {
    let isMounted = true;

    if (token && !user) {
      API.get('/auth/me')
        .then(res => {
          if (!isMounted) return;
          setUser(res.data.user);
          localStorage.setItem('auth.user', JSON.stringify(res.data.user));
        })
        .catch(() => {
          // safe to call now
          logout();
        });
    }

    return () => {
      isMounted = false;
    };
  }, [token, user, logout]);

  const login = useCallback(({ token: t, user: u }) => {
    setToken(t);
    setUser(u);
    localStorage.setItem('auth.token', t);
    localStorage.setItem('auth.user', JSON.stringify(u));
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
