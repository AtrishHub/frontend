// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000000,
});

api.interceptors.request.use(
  config => {
    // Only handle client-side tokens
    if (typeof window !== 'undefined') {
      const token = document.cookie.match(/access_token=([^;]+)/)?.[1] || '';
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;