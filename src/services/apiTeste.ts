import { storage } from "@/utils/storage";
import axios from "axios";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:8367";
const TOKEN_KEY = "auth_token";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await storage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
