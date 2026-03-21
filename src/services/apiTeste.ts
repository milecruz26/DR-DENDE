import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'https://sua-api.com'; // substituir pela URL real

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});