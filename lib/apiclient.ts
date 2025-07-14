// lib/apiClient.ts
import axios from 'axios';
import { getAccessToken } from '@auth0/nextjs-auth0';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/auth',
  withCredentials: true,
});

// Request interceptor to add the access token
// api.interceptors.request.use(async (config) => {
//   try {
//     const accessToken = await getAccessToken();

//     if (accessToken && config.headers) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   } catch (err) {
//     console.error('Failed to get access token:', err);
//     return config;
//   }
// });

export default api;
