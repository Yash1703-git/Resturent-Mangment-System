import React, { useEffect, useState, useCallback } from 'react';
import API from '../api/api';
import AuthContext from './authContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('auth.user') || 'null')
  );
  const [token, setToken] = useState(() =>
    localStorage.getItem('auth.token') || null
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('auth.token');
    localStorage.removeItem('auth.user');
  }, []);

  useEffect(() => {
    let mounted = true;
    if (token && !user) {
      API.get('/auth/me')
        .then(res => {
          if (!mounted) return;
          setUser(res.data.user);
          localStorage.setItem('auth.user', JSON.stringify(res.data.user));
        })
        .catch(logout);
    }
    return () => {
      mounted = false;
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
};

export default AuthProvider;
