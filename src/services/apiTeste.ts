import { storage } from "@/utils/storage";
import { STORAGE_KEYS } from "@/constants/storageKeys";
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
  return config;
});
