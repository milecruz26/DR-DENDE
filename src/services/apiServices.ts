// src/services/apiServices.ts
import api from './api'; // Sua instância do Axios configurada anteriormente

// ==========================================
// 1. TIPAGENS (Baseadas no PDF - Modelos de Dados)
// ==========================================

export type UserType = 'COMMON' | 'STAFF' | 'ESTABLISHMENT';

export interface UserFullResponse {
  id: string;
  username: string;
  email: string;
  user_type: UserType;
  address: string | null;
  role: string | null;
}

export interface Address {
  city: string;
  street: string;
  neighborhood: string;
  zip_code: string;
}

// "Entry" na API é o seu "Verbete"
export interface EntryCreator {
  id: string;
  name: string;
  picture: string;
  audio: string;
  entry_text: string;
  category: 'simples' | string;
  estimated_time: string;
  difficulty_level: 'facil' | 'moderado' | 'dificil';
}

export interface EventCreator {
  id: string;
  name: string;
  event_date: string; // YYYY-MM-DD
  description: string;
  address: Address;
}

export interface DishResponse {
  id: string;
  stablishment_id: string;
  name: string;
  dish_image_path: string;
  associated_entry: string;
}

// ==========================================
// 2. MOCK DATA (Nosso Banco de Dados Falso)
// ==========================================

// Variável global para ligar/desligar o Mock facilmente
const USE_MOCK = true;

const MOCK_DB = {
  users: [
    {
      id: 'u1',
      username: 'joao_comum',
      email: 'joao@teste.com',
      user_type: 'COMMON',
      address: null,
      role: null,
    },
    {
      id: 'u2',
      username: 'admin_staff',
      email: 'staff@teste.com',
      user_type: 'STAFF',
      address: null,
      role: null,
    },
    {
      id: 'u3',
      username: 'bar_do_ze',
      email: 'ze@teste.com',
      user_type: 'ESTABLISHMENT',
      address: 'Rua A',
      role: null,
    },
  ] as UserFullResponse[],

  entries: [
    {
      id: 'ent1',
      name: 'Passarinha',
      picture: 'passarinha.png',
      audio: '',
      entry_text: 'A passarinha é...',
      category: 'simples',
      estimated_time: '30 min',
      difficulty_level: 'facil',
    },
  ] as EntryCreator[],

  events: [
    {
      id: 'ev1',
      name: 'Feijoada de São Jorge',
      event_date: '2026-04-23',
      description: 'Tradicional feijoada',
      address: {
        city: 'Salvador',
        street: 'Rua Direita',
        neighborhood: 'Santo Antônio',
        zip_code: '40000-000',
      },
    },
  ] as EventCreator[],

  dishes: [] as DishResponse[],
  liked_dishes: [] as string[], // IDs dos pratos
  complaints: [] as any[],
};

// Simulador de Delay da Rede
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ==========================================
// 3. FUNÇÕES DE SERVIÇO DA API
// ==========================================

export const AuthService = {
  // Endpoint: POST /login
  login: async (credentials: any) => {
    if (!USE_MOCK) return api.post('/login', credentials);

    await delay(800);
    const user = MOCK_DB.users.find((u) => u.username === credentials.username);
    if (!user) throw new Error('401 Unauthorized - Usuário ou senha inválidos');
    return { data: { access_token: `mock-jwt-token-for-${user.id}`, token_type: 'bearer' } };
  },
};

export const UserService = {
  // Endpoint: GET /users/common
  getCurrentUser: async () => {
    if (!USE_MOCK) return api.get('/users/common');
    await delay(500);
    return { data: MOCK_DB.users[0] }; // Retorna o usuário comum no mock
  },

  // Endpoint: POST /users/common
  createUser: async (userData: any) => {
    if (!USE_MOCK) return api.post('/users/common', userData);
    await delay(800);
    const newUser: UserFullResponse = {
      id: Math.random().toString(),
      ...userData,
      user_type: 'COMMON',
      address: null,
      role: null,
    };
    MOCK_DB.users.push(newUser);
    return { data: newUser };
  },

  // Endpoint: POST /dishes/like/{dish_id}
  likeDish: async (dishId: string) => {
    if (!USE_MOCK) return api.post(`/dishes/like/${dishId}`);
    await delay(300);
    if (!MOCK_DB.liked_dishes.includes(dishId)) MOCK_DB.liked_dishes.push(dishId);
    return { data: { message: 'Prato adicionado aos favoritos' } };
  },
};

export const StaffService = {
  // Endpoint: GET /staff/entry/all
  getAllEntries: async () => {
    if (!USE_MOCK) return api.get('/staff/entry/all');
    await delay(500);
    return { data: { entries: MOCK_DB.entries } };
  },

  // Endpoint: POST /staff/entry
  createEntry: async (entryData: EntryCreator) => {
    if (!USE_MOCK) return api.post('/staff/entry', entryData);
    await delay(800);
    const newEntry = { ...entryData, id: Math.random().toString() };
    MOCK_DB.entries.push(newEntry);
    return { data: { id: newEntry.id, name: newEntry.name, created_at: new Date().toISOString() } };
  },

  // Endpoint: GET /staff/event/all
  getAllEvents: async () => {
    if (!USE_MOCK) return api.get('/staff/event/all');
    await delay(500);
    return { data: { events: MOCK_DB.events } };
  },

  // Endpoint: POST /staff/event
  createEvent: async (eventData: EventCreator) => {
    if (!USE_MOCK) return api.post('/staff/event', eventData);
    await delay(800);
    const newEvent = { ...eventData, id: Math.random().toString() };
    MOCK_DB.events.push(newEvent);
    return { data: { id: newEvent.id, name: newEvent.name, created_at: new Date().toISOString() } };
  },
};

export const EstablishmentService = {
  // Endpoint: POST /establishments
  createEstablishment: async (data: any) => {
    if (!USE_MOCK) return api.post('/establishments', data);
    await delay(800);
    const newEst = {
      id: Math.random().toString(),
      username: data.username,
      email: data.email,
      address: data.address,
      user_type: 'ESTABLISHMENT' as UserType,
      role: null,
    };
    MOCK_DB.users.push(newEst);
    return { data: newEst };
  },

  // Endpoint: GET /establishments/dish
  getDishes: async () => {
    if (!USE_MOCK) return api.get('/establishments/dish');
    await delay(500);
    return { data: { dishes: MOCK_DB.dishes } };
  },
};
