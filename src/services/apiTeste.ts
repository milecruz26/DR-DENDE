import { STORAGE_KEYS } from "@/constants/storageKeys";
import { storage } from "@/utils/storage";
import axios from "axios";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:8367";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await storage.getItem(STORAGE_KEYS.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('🚀 REQUEST:');
  console.log('URL:', config.url);
  console.log('METHOD:', config.method);
  console.log('HEADERS:', config.headers);
  console.log('DATA:', JSON.stringify(config.data, null, 2));
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('✅ RESPONSE:');
    console.log('URL:', response.config.url);
    console.log('DATA:', response.data);

    return response;
  },
  (error) => {
    console.log('❌ RESPONSE ERROR:');
    console.log('URL:', error.config?.url);
    console.log('DATA:', error.response?.data);

    return Promise.reject(error);
  }
);
