// lib/request.ts
import api from './api';

export const postRequest = async <T>(url: string, data: any): Promise<T> => {
  const response = await api.post<T>(url, data);
  return response.data;
};

export const getRequest = async <T>(url: string): Promise<T> => {
  const response = await api.get<T>(url);
  return response.data;
};


