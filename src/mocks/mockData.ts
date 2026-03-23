import { Complaint, Dish, Entry, Event, User } from '../interfaces';

export const mockUsers: User[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    username: 'joao_common',
    email: 'joao@example.com',
    user_type: 'common',
    address: 'Rua das Flores, 123',
    role: null,
    confirmed: true,   // já confirmado (primeira vez já passou)
    password: 'Qwerty1@'
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    username: 'maria_staff',
    email: 'maria@staff.com',
    user_type: 'staff',
    address: null,
    role: 'admin',
    password: 'Qwerty1@'
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    username: 'restaurante_estab',
    email: 'contato@restaurante.com',
    user_type: 'establishment',
    address: 'Av. Principal, 456',
    role: 'owner',
    password: 'Qwerty1@'
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    username: 'novo_usuario',
    email: 'novo@example.com',
    user_type: 'common',
    address: null,
    role: null,
    confirmed: false,
    password: 'Qwerty1@'
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
    picture: 'feijoada',
    audio: 'https://example.com/audio1.mp3',
    entry_text: 'Descrição da entrada 1',
    category: 'entradas',
    estimated_time: '15 min',
    difficulty_level: 'facil',
    ingredients: [{ name: 'linguica' }, { name: 'sal' }, { name: 'coco' }, { name: 'pimentão' }, { name: 'ovo' }],
  },
  {
    id: 'entry-2',
    name: 'Entrada 2',
    picture: 'cozido',
    audio: 'https://example.com/audio2.mp3',
    entry_text: 'Descrição da entrada 2',
    category: 'pratos principais',
    estimated_time: '30 min',
    difficulty_level: 'médio',
    ingredients: [{ name: 'pão' }, { name: 'manteiga' }, { name: 'mandioca' }, { name: 'milho-branco' }, { name: 'frango' }],
  },
  {
    id: 'entry-3',
    name: 'Entrada 3',
    picture: 'cuscuz',
    audio: 'https://example.com/audio2.mp3',
    entry_text: 'Descrição da entrada 3',
    category: 'pratos principais',
    estimated_time: '30 min',
    difficulty_level: 'médio',
    ingredients: [{ name: 'aipim' }, { name: 'sal' }, { name: 'bucho' }, { name: 'milho-branco' }, { name: 'açúcar' }],
  },
  {
    id: 'entry-4',
    name: 'Entrada 4',
    picture: 'acarajé',
    audio: 'https://example.com/audio2.mp3',
    entry_text: 'Descrição da entrada 4',
    category: 'pratos principais',
    estimated_time: '30 min',
    difficulty_level: 'médio',
    ingredients: [{ name: 'azeite-dendê' }, { name: 'cebolinha' }, { name: 'carne' }, { name: 'coentro' }, { name: 'frango' }],
  },
];

export const mockEvents: Event[] = [
  {
    id: 'event-1',
    name: 'Festival Gastronômico',
    event_date: '2026-03-26T19:00:00', // data + hora
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
    event_date: '2026-03-25T14:30:00',
    description: 'Aprenda a cozinhar pratos italianos',
    address: {
      city: 'Rio de Janeiro',
      street: 'Rua do Ouvidor, 50',
      neighborhood: 'Centro',
      zip_code: '20040-030',
    },
  },
  {
    id: 'event-3',
    name: 'Teste culinário',
    event_date: '2026-03-24T14:30:00',
    description: 'Aprenda a cozinhar pratos italianos',
    address: {
      city: 'Rio de Janeiro',
      street: 'Rua do Ouvidor, 50',
      neighborhood: 'Centro',
      zip_code: '20040-030',
    },
  },
  {
    id: 'event-4',
    name: 'Bota pra quebrar',
    event_date: '2026-03-23T12:30:00',
    description: 'Aprenda a cozinhar pratos italianos',
    address: {
      city: 'Rio de Janeiro',
      street: 'Rua do Ouvidor, 50',
      neighborhood: 'Centro',
      zip_code: '20040-030',
    },
  },
  {
    id: 'event-5',
    name: 'Ebaa',
    event_date: '2026-03-23T11:30:00',
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