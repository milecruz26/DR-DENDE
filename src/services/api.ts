import axios from 'axios';

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

/* DICA: Aqui você pode adicionar interceptors no futuro 
  para injetar o token do usuário logado automaticamente 
  em todas as requisições.
*/

export default api;