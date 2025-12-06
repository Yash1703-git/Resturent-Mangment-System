import React, { createContext, useEffect, useState } from 'react';
import API from '../api/api';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('auth.user') || 'null'));
  const [token, setToken] = useState(() => localStorage.getItem('auth.token') || null);

  useEffect(() => {
    if (token && !user) {
      // fetch /me
      API.get('/auth/me').then(res => {
        setUser(res.data.user);
        localStorage.setItem('auth.user', JSON.stringify(res.data.user));
      }).catch(() => { logout(); });
    }
  }, []);

  const login = ({ token, user }) => {
    setToken(token); setUser(user);
    localStorage.setItem('auth.token', token);
    localStorage.setItem('auth.user', JSON.stringify(user));
  };
  const logout = () => {
    setToken(null); setUser(null);
    localStorage.removeItem('auth.token');
    localStorage.removeItem('auth.user');
  };
  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
};
