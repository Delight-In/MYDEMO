import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 10000,
  });

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await api.post('login', { email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      let errorMessage = 'Login failed';
      if (error.response) errorMessage = error.response.data?.message || 'Login failed';
      else if (error.request) errorMessage = 'Cannot connect to server.';
      else errorMessage = error.message;
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const response = await api.post('register', { name, email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      let errorMessage = 'Registration failed';
      if (error.response) {
        if (error.response.data.errors && error.response.data.errors.length > 0) {
          errorMessage = error.response.data.errors[0].msg;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {
        errorMessage = 'Cannot connect to server.';
      } else {
        errorMessage = error.message;
      }
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const response = await api.get('profile', { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};