import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  // Se for testar com o celular físico e o backend no PC, 
  // use o IP da sua máquina (ex: 192.168.1.5) em vez de localhost.
  baseURL: 'https://sua-api-pnab.com.br/api',
  timeout: 10000, // 10 segundos de limite para a resposta
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// --- O INTERCEPTOR ---
api.interceptors.request.use(
  async (config) => {
    // 1. Buscamos o token que você salvou no login
    const token = await SecureStore.getItemAsync('user_token');

    // 2. Se o token existir, injetamos no Header
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Caso ocorra erro antes mesmo de enviar a requisição
    return Promise.reject(error);
  }
);

// --- INTERCEPTOR DE RESPOSTA (Bônus) ---
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Se o servidor retornar 401 (Não autorizado), o token expirou
    if (error.response && error.response.status === 401) {
      // Aqui você poderia deslogar o usuário automaticamente
      console.log("Token expirado, redirecionando para login...");
    }
    return Promise.reject(error);
  }
);

export default api;

// FEITO NO DEEP SEEK:
// export const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Interceptor para adicionar token de autenticação
// api.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem('@token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });