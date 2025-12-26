import React, { useEffect, useState, useCallback } from 'react';
import API from '../api/api';
import AuthContext from './AuthContext';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(sessionStorage.getItem('auth.user'))
  );
  const [token, setToken] = useState(
    sessionStorage.getItem('auth.token')
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    sessionStorage.clear();
  }, []);

  useEffect(() => {
    if (token && !user) {
      API.get('/auth/me')
        .then(res => {
          setUser(res.data.user);
          sessionStorage.setItem(
            'auth.user',
            JSON.stringify(res.data.user)
          );
        })
        .catch(() => logout());
    }
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
