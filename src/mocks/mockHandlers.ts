import { Complaint, ComplaintValidation, Dish, Event, User } from '../interfaces';
import { api } from '../services/apiTeste';
import {
  mockComplaints,
  mockDishes,
  mockEntries,
  mockEvents,
  mockUsers,
} from './mockData';

const USE_MOCKS = true;

// Função auxiliar para obter usuário a partir do token no header
function getUserFromToken(config: any): User | null {
  const authHeader = config.headers?.Authorization || config.headers?.authorization;
  if (!authHeader) return null;
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  // Token fictício: fake-token-<user-id>
  if (token && token.startsWith('fake-token-')) {
    const userId = token.replace('fake-token-', '');
    const user = mockUsers.find(u => u.id === userId);
    return user || null;
  }
  return null;
}

if (USE_MOCKS) {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { config, response } = error;
      if (!config || !USE_MOCKS) return Promise.reject(error);

      // Simula login (rota pública)
      if (config.url === '/token' && config.method === 'post') {
        const params = new URLSearchParams(config.data);
        const username = params.get('username');
        const password = params.get('password');
        const user = mockUsers.find(u => u.email === username);
        if (user && password) {
          // Gera token com o id do usuário
          console.log('password:', password)
          const token = `fake-token-${user.id}`;
          return Promise.resolve({
            data: { access_token: token, token_type: 'bearer' },
            status: 200,
          });
        }
        return Promise.reject({ response: { status: 401, data: { detail: 'Invalid credentials' } } });
      }

      // Verifica autenticação para rotas protegidas
      const user = getUserFromToken(config);
      if (!user && config.url !== '/token') {
        return Promise.reject({ response: { status: 401, data: { detail: 'Not authenticated' } } });
      }

      // GET /users/me
      if (config.url === '/users/me' && config.method === 'get') {
        return Promise.resolve({ data: user, status: 200 });
      }

      // GET /users/{user_id}
      const userMatch = config.url?.match(/^\/users\/(.+)$/);
      if (userMatch && config.method === 'get') {
        const userId = userMatch[1];
        const foundUser = mockUsers.find(u => u.id === userId);
        if (foundUser) {
          return Promise.resolve({ data: foundUser, status: 200 });
        }
        return Promise.reject({ response: { status: 404, data: { detail: 'User not found' } } });
      }

      // PUT /users/me
      if (config.url === '/users/me' && config.method === 'put') {
        const updated = config.data;
        Object.assign(user as User, updated);
        return Promise.resolve({ data: user, status: 200 });
      }

      // POST /users
      if (config.url === '/users' && config.method === 'post') {
        const newUser = config.data as User;
        newUser.id = `user-${Date.now()}`;
        mockUsers.push(newUser);
        return Promise.resolve({ data: newUser, status: 201 });
      }

      // GET /dishes/liked
      if (config.url === '/dishes/liked' && config.method === 'get') {
        return Promise.resolve({ data: mockDishes.slice(0, 1), status: 200 });
      }

      // POST /dishes/like/{dish_id}
      const likeMatch = config.url?.match(/^\/dishes\/like\/(.+)$/);
      if (likeMatch && config.method === 'post') {
        return Promise.resolve({ status: 201, data: null });
      }

      // DELETE /dishes/dislike/{dish_id}
      const dislikeMatch = config.url?.match(/^\/dishes\/dislike\/(.+)$/);
      if (dislikeMatch && config.method === 'delete') {
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

      // POST /staff/complaints (validação)
      if (config.url === '/staff/complaints' && config.method === 'post') {
        const validation = config.data as ComplaintValidation;
        const complaint = mockComplaints.find(c => c.id === validation.complaint_id);
        if (complaint) {
          complaint.validated = validation.validation;
          complaint.response = validation.complaint_response;
        }
        return Promise.resolve({ status: 200, data: null });
      }

      // GET /staff/entry/{entry_id}
      const entryMatch = config.url?.match(/^\/staff\/entry\/(.+)$/);
      if (entryMatch && config.method === 'get') {
        const entry = mockEntries.find(e => e.id === entryMatch[1]);
        if (entry) return Promise.resolve({ data: entry, status: 200 });
        return Promise.reject({ response: { status: 404 } });
      }

      // GET /staff/event/all
      if (config.url === '/staff/event/all' && config.method === 'get') {
        return Promise.resolve({ data: mockEvents, status: 200 });
      }

      // GET /staff/event/{event_id}
      const eventMatch = config.url?.match(/^\/staff\/event\/(.+)$/);
      if (eventMatch && config.method === 'get') {
        const event = mockEvents.find(e => e.id === eventMatch[1]);
        if (event) return Promise.resolve({ data: event, status: 200 });
        return Promise.reject({ response: { status: 404 } });
      }

      // POST /staff/event
      if (config.url === '/staff/event' && config.method === 'post') {
        const newEvent = config.data as Omit<Event, 'id'>;
        const event: Event = { ...newEvent, id: `event-${Date.now()}` };
        mockEvents.push(event);
        return Promise.resolve({ data: event, status: 201 });
      }

      // ESTABLISHMENT endpoints
      // GET /establishments/me
      if (config.url === '/establishments/me' && config.method === 'get') {
        if (user?.user_type === 'establishment') {
          return Promise.resolve({ data: user, status: 200 });
        }
        return Promise.reject({ response: { status: 403, data: { detail: 'Not an establishment' } } });
      }

      // GET /establishments/dishes/me
      if (config.url === '/establishments/dishes/me' && config.method === 'get') {
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
  );
}