import * as SecureStore from 'expo-secure-store';
import { Complaint, ComplaintValidation, Dish, Event, User } from '../interfaces';
import { api } from '../services/apiTeste';
import { mockUsers as initialMockUsers, mockComplaints, mockDishes, mockEntries, mockEvents } from './mockData';

const USE_MOCKS = false;
const MOCK_USERS_KEY = 'mock_users';
const CONFIRM_TOKENS_KEY = 'mock_confirm_tokens';
const LIKED_DISHES_KEY = 'mock_liked_dishes'; // Chave para os likes

// Variáveis globais (carregadas do SecureStore)
let mockUsers: User[] = [];
let confirmationTokens: Record<string, string> = {};
let likedDishesMap: Record<string, string[]> = {}; // userId -> array de entryIds

let dataLoaded = false;
let loadPromise: Promise<void> | null = null;

// Função auxiliar para obter usuário a partir do token no header
function getUserFromToken(config: any): User | null {
  const authHeader = config.headers?.Authorization || config.headers?.authorization;
  if (!authHeader) return null;
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  if (token && token.startsWith('fake-token-')) {
    const userId = token.replace('fake-token-', '');
    const user = mockUsers.find(u => u.id === userId);
    return user || null;
  }
  return null;
}

// Carrega todos os dados (usuários, tokens, likes)
const loadMockData = async () => {
  try {
    const storedUsers = await SecureStore.getItemAsync(MOCK_USERS_KEY);
    if (storedUsers) {
      mockUsers = JSON.parse(storedUsers);
    } else {
      mockUsers = [...initialMockUsers];
    }

    const storedTokens = await SecureStore.getItemAsync(CONFIRM_TOKENS_KEY);
    if (storedTokens) {
      confirmationTokens = JSON.parse(storedTokens);
    } else {
      confirmationTokens = {};
    }

    const storedLikes = await SecureStore.getItemAsync(LIKED_DISHES_KEY);
    if (storedLikes) {
      likedDishesMap = JSON.parse(storedLikes);
    } else {
      likedDishesMap = {};
    }
  } catch (error) {
    console.error('Falha ao carregar dados dos mocks:', error);
    mockUsers = [...initialMockUsers];
    confirmationTokens = {};
    likedDishesMap = {};
  } finally {
    dataLoaded = true;
  }
};

// Salva todos os dados (usuários, tokens, likes)
const saveMockData = async () => {
  try {
    await SecureStore.setItemAsync(MOCK_USERS_KEY, JSON.stringify(mockUsers));
    await SecureStore.setItemAsync(CONFIRM_TOKENS_KEY, JSON.stringify(confirmationTokens));
    await SecureStore.setItemAsync(LIKED_DISHES_KEY, JSON.stringify(likedDishesMap));
  } catch (error) {
    console.error('Falha ao salvar dados dos mocks:', error);
  }
};

// Inicia o carregamento

const saveLikedDishes = async () => {
  await SecureStore.setItemAsync(LIKED_DISHES_KEY, JSON.stringify(likedDishesMap));
};

// Carregar durante a inicialização
// await loadLikedDishes();

// Inicia o carregamento
loadPromise = loadMockData();

if (USE_MOCKS) {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { config, response } = error;
      if (!config || !USE_MOCKS) return Promise.reject(error);
      if (!dataLoaded) {
        await loadPromise;
      }

      // Simula login (rota pública)
      if (config.url === '/login' && config.method === 'post') {
        const params = new URLSearchParams(config.data);
        const username = params.get('username');
        const password = params.get('password');
        console.log('Login - email informado:', username);
        console.log('Lista de emails disponíveis:', mockUsers.map(u => u.email));
        const user = mockUsers.find(u => u.email === username);
        console.log('Usuário encontrado?', user ? user.email : 'NÃO');
        console.log('password:', password)
        if (user && user.password === password) {
          const token = `fake-token-${user.id}`;
          return Promise.resolve({
            data: { access_token: token, token_type: 'bearer' },
            status: 200,
          });
        }
        console.log(user?.password)
        return Promise.reject({ response: { status: 401, data: { detail: 'Invalid credentials' } } });
      }

      // Verifica autenticação para rotas protegidas
      const user = getUserFromToken(config);
      if (!user && config.url !== '/login') {
        return Promise.reject({ response: { status: 401, data: { detail: 'Not authenticated' } } });
      }

      // GET /users/common
      if (config.url === '/users/common' && config.method === 'get') {
        return Promise.resolve({ data: user, status: 200 });
      }

      // GET /staff/user/{user_id}
      const userMatch = config.url?.match(/^\/staff\/user\/([^/]+)$/);
      if (userMatch && config.method === 'get') {
        const userId = userMatch[1];
        const foundUser = mockUsers.find(u => u.id === userId);
        if (foundUser) {
          return Promise.resolve({ data: foundUser, status: 200 });
        }
        return Promise.reject({ response: { status: 404, data: { detail: 'User not found' } } });
      }

      // PUT /users/common
      if (config.url === '/users/common' && config.method === 'put') {
        const user = getUserFromToken(config);
        if (!user) {
          return Promise.reject({ response: { status: 401, data: { detail: 'Not authenticated' } } });
        }

        let updated: any = {};
        // Detecta se é FormData
        if (config.data instanceof FormData) {
          for (const [key, value] of (config.data as any)._parts) {
            if (key === 'avatar') {
              // No mock, vamos apenas guardar a URI como string (simulação)
              updated.avatar = value.uri || value;
            } else {
              updated[key] = value;
            }
          }
        } else {
          // Se for JSON string, parse
          let requestData = config.data;
          if (typeof requestData === 'string') {
            requestData = JSON.parse(requestData);
          }
          updated = requestData;
        }

        // Atualiza o objeto do usuário
        Object.assign(user, updated);
        await saveMockData();

        // Retorna sem a senha
        const { password: _, ...userWithoutPassword } = user;
        return Promise.resolve({ data: userWithoutPassword, status: 200 });
      }

      // POST /users/common
      if (config.url === '/users/common' && config.method === 'post') {
        const newUserData: User = JSON.parse(config.data);
        const userId = `user-${Date.now()}`;
        const token = `confirm-${userId}`;
        confirmationTokens[token] = userId;
        const { email, username, user_type, password } = newUserData

        console.log('AQUII', config.data);
        console.log('O TIPO AQUI:', typeof config.data);
        console.log('tipo do newUserData:', typeof newUserData)

        console.log('novo usuario na linha 153', newUserData)
        console.log('DADOS DO NEWUSERDATA', 'email:', email, 'usernarme:', username)
        const newUser: User = {
          id: userId,
          username,
          email,
          user_type,
          address: newUserData.address || null,
          role: newUserData.role || null,
          confirmed: false,
          password // armazenamos a senha (não será retornada nas respostas)
        };

        mockUsers.push(newUser);
        await saveMockData();
        console.log('novo usuario:', newUser)

        // Simula envio de e-mail
        console.log(`[MOCK] Usuário criado: ${newUser.email}`);
        console.log(`[MOCK] Token de confirmação: ${token}`);
        console.log(`[MOCK] Link: exp://.../--/confirm?token=${token}`);


        // console.log('Novo usuário adicionado:', newUser.email);
        // console.log('Total de usuários agora:', mockUsers.length);
        // Retorna o usuário sem a senha
        const { password: _, ...userWithoutPassword } = newUser;
        return Promise.resolve({ data: userWithoutPassword, status: 201 });
      }

      if (config.url?.startsWith('/confirm') && config.method === 'get') {
        const url = new URL(config.url, 'http://dummy.com');
        const token = url.searchParams.get('token');
        if (!token) {
          return Promise.reject({ response: { status: 400, data: { detail: 'Token missing' } } });
        }
        const userId = confirmationTokens[token];
        if (!userId) {
          return Promise.reject({ response: { status: 400, data: { detail: 'Invalid token' } } });
        }
        const user = mockUsers.find(u => u.id === userId);
        if (!user) {
          return Promise.reject({ response: { status: 404, data: { detail: 'User not found' } } });
        }
        user.confirmed = true;
        delete confirmationTokens[token];
        await saveMockData();

        return Promise.resolve({ data: { message: 'Email confirmed successfully' }, status: 200 });
      }

      // GET /dishes/liked
      if (config.url === '/dishes/liked' && config.method === 'get') {
        const user: User = getUserFromToken(config) as User
        // if (!user) return reject(...);
        const likedIds = likedDishesMap[user.id] || [];
        const likedDishes = mockEntries.filter(entry => likedIds.includes(entry.id));
        return Promise.resolve({ data: likedDishes, status: 200 });
      }

      // POST /dishes/like/{dish_id}
      const likeMatch = config.url?.match(/^\/dishes\/like\/(.+)$/);
      if (likeMatch && config.method === 'post') {
        const dishId = likeMatch[1];
        const user: User = getUserFromToken(config) as User
        // if (!user) return reject(...);
        if (!likedDishesMap[user.id]) likedDishesMap[user.id] = [];
        if (!likedDishesMap[user.id].includes(dishId)) {
          likedDishesMap[user.id].push(dishId);
          await saveLikedDishes();
        }
        return Promise.resolve({ status: 201, data: null });
      }

      // DELETE /dishes/dislike/{dish_id}
      const dislikeMatch = config.url?.match(/^\/dishes\/dislike\/(.+)$/);
      if (dislikeMatch && config.method === 'delete') {
        const dishId = dislikeMatch[1];
        const user: User = getUserFromToken(config) as User
        // if (!user) return reject(...);
        if (likedDishesMap[user.id]) {
          likedDishesMap[user.id] = likedDishesMap[user?.id].filter(id => id !== dishId);
          await saveLikedDishes();
        }
        return Promise.resolve({ status: 204, data: null });
      }

      // GET /complaints/me
      if (config.url === '/complaints/me' && config.method === 'get') {
        const userComplaints = mockComplaints.filter(c => c.user_id === user?.id);
        return Promise.resolve({ data: userComplaints, status: 200 });
      }

      // POST /complaints
      if (config.url === '/complaints' && config.method === 'post') {
        const newComplaint = config.data as Complaint;
        newComplaint.id = `complaint-${Date.now()}`;
        newComplaint.user_id = user?.id;
        mockComplaints.push(newComplaint);
        return Promise.resolve({ data: newComplaint, status: 201 });
      }

      // STAFF endpoints
      // GET /staff/complaints/{user_id}
      const staffComplaintsMatch = config.url?.match(/^\/staff\/complaints\/(.+)$/);
      if (staffComplaintsMatch && config.method === 'get') {
        const userId = staffComplaintsMatch[1];
        const complaints = mockComplaints.filter(c => c.user_id === userId);
        return Promise.resolve({ data: complaints, status: 200 });
      }

      // POST /staff/complaints/validate
      if (config.url === '/staff/complaints/validate' && config.method === 'post') {
        const validation = config.data as ComplaintValidation;
        const complaint = mockComplaints.find(c => c.id === validation.complaint_id);
        if (complaint) {
          complaint.validated = validation.validation;
          complaint.response = validation.complaint_response;
        }
        return Promise.resolve({ status: 200, data: null });
      }

      // GET /staff/entry/all
      if (config.url?.startsWith('/staff/entry/all') && config.method === 'get') {
        return Promise.resolve({ data: mockEntries, status: 200 });
      }

      // GET /staff/entry/{entry_id}
      const entryMatch = config.url?.match(/^\/staff\/entry\/([^/]+)$/);
      if (entryMatch && config.method === 'get') {
        const entryId = entryMatch[1];
        const entry = mockEntries.find(e => e.id === entryId);
        if (entry) return Promise.resolve({ data: entry, status: 200 });
        return Promise.reject({ response: { status: 404 } });
      }

      // GET /staff/events/all
      if (config.url?.startsWith('/staff/events/all') && config.method === 'get') {
        return Promise.resolve({ data: mockEvents, status: 200 });
      }

      // GET /events/{event_id}
      const eventMatch = config.url?.match(/^\/events\/([^/]+)$/);
      if (eventMatch && config.method === 'get') {
        const event = mockEvents.find(e => e.id === eventMatch[1]);
        if (event) return Promise.resolve({ data: event, status: 200 });
        return Promise.reject({ response: { status: 404 } });
      }

      // GET /events/ongoing/all
      if (config.url?.startsWith('/events/ongoing/all') && config.method === 'get') {
        return Promise.resolve({ data: mockEvents, status: 200 });
      }

      // GET /events/nearby
      if (config.url?.startsWith('/events/nearby') && config.method === 'get') {
        return Promise.resolve({ data: mockEvents, status: 200 });
      }

      // POST /staff/event
      if (config.url === '/staff/event' && config.method === 'post') {
        const newEvent = config.data as Omit<Event, 'id'>;
        const event: Event = { ...newEvent, id: `event-${Date.now()}` };
        mockEvents.push(event);
        return Promise.resolve({ data: event, status: 201 });
      }

      // ESTABLISHMENT endpoints
      // GET /establishments
      if (config.url === '/establishments' && config.method === 'get') {
        if (user?.user_type === 'establishment') {
          return Promise.resolve({ data: user, status: 200 });
        }
        return Promise.reject({ response: { status: 403, data: { detail: 'Not an establishment' } } });
      }

      // GET /establishments/dish
      if (config.url === '/establishments/dish' && config.method === 'get') {
        const dishes = mockDishes.filter(d => d.establishment_id === user?.id);
        return Promise.resolve({ data: dishes, status: 200 });
      }

      // POST /establishments/dish
      if (config.url === '/establishments/dish' && config.method === 'post') {
        const newDish = config.data as Omit<Dish, 'id'>;
        const dish: Dish = { ...newDish, id: `dish-${Date.now()}`, establishment_id: user?.id };
        mockDishes.push(dish);
        return Promise.resolve({ data: dish, status: 201 });
      }

      // Se não mapeado, rejeita
      return Promise.reject(error);
    }
  )
}