import { Complaint, Dish, Entry, Event, User } from '../interfaces';

export const mockUsers: User[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    username: 'joao_common',
    email: 'joao@example.com',
    user_type: 'common',
    address: 'Rua das Flores, 123',
    role: null,
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    username: 'maria_staff',
    email: 'maria@staff.com',
    user_type: 'staff',
    address: null,
    role: 'admin',
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    username: 'restaurante_estab',
    email: 'contato@restaurante.com',
    user_type: 'establishment',
    address: 'Av. Principal, 456',
    role: 'owner',
  },
];

export const mockDishes: Dish[] = [
  {
    id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    name: 'Lasanha',
    dish_image_path: 'https://example.com/lasanha.jpg',
    associated_entry: 'entry-1',
    establishment_id: '33333333-3333-3333-3333-333333333333',
  },
  {
    id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    name: 'Pizza Margherita',
    dish_image_path: 'https://example.com/pizza.jpg',
    associated_entry: 'entry-2',
    establishment_id: '33333333-3333-3333-3333-333333333333',
  },
];

export const mockEntries: Entry[] = [
  {
    id: 'entry-1',
    name: 'Entrada 1',
    picture: 'https://example.com/entrada1.jpg',
    audio: 'https://example.com/audio1.mp3',
    entry_text: 'Descrição da entrada 1',
    category: 'entradas',
    estimated_time: '15 min',
    difficulty_level: 'facil',
    ingredients: [{ name: 'Ingrediente A' }, { name: 'Ingrediente B' }],
  },
  {
    id: 'entry-2',
    name: 'Entrada 2',
    picture: 'https://example.com/entrada2.jpg',
    audio: 'https://example.com/audio2.mp3',
    entry_text: 'Descrição da entrada 2',
    category: 'pratos principais',
    estimated_time: '30 min',
    difficulty_level: 'médio',
    ingredients: [{ name: 'Ingrediente C' }, { name: 'Ingrediente D' }],
  },
];

export const mockEvents: Event[] = [
  {
    id: 'event-1',
    name: 'Festival Gastronômico',
    event_date: '2026-03-21T19:00:00', // data + hora
    description: 'Degustação de pratos típicos',
    address: {
      city: 'São Paulo',
      street: 'Av. Paulista, 1000',
      neighborhood: 'Bela Vista',
      zip_code: '01310-100',
    },
  },
  {
    id: 'event-2',
    name: 'Workshop de Culinária',
    event_date: '2026-03-22T14:30:00',
    description: 'Aprenda a cozinhar pratos italianos',
    address: {
      city: 'Rio de Janeiro',
      street: 'Rua do Ouvidor, 50',
      neighborhood: 'Centro',
      zip_code: '20040-030',
    },
  },
];

export const mockComplaints: Complaint[] = [
  {
    id: 'complaint-1',
    user_id: '11111111-1111-1111-1111-111111111111',
    text: 'Atendimento demorado',
    establishment_id: '33333333-3333-3333-3333-333333333333',
    response: 'Lamentamos o ocorrido, estamos trabalhando para melhorar nosso atendimento.',
    validated: false,
  },
  {
    id: 'complaint-2',
    user_id: '11111111-1111-1111-1111-111111111111',
    text: 'Prato veio frio',
    establishment_id: '33333333-3333-3333-3333-333333333333',
    response: 'Pedimos desculpas, vamos melhorar!',
    validated: true,
  },
];