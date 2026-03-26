import { Complaint, Dish, Entry, Event, User } from '../interfaces';

const coverMap = {
  '33333333-3333-3333-3333-333333333333': '@/assets/images/mock/capa-1.png',
  '44444444-4444-4444-4444-444444444444': '@/assets/images/mock/capa-2.jpg',
  '55555555-5555-5555-5555-555555555555': '@/assets/images/mock/capa-3.jpg'
};
const logoMap = {
  '33333333-3333-3333-3333-333333333333': '@/assets/images/mock/logo-1.png',
  '44444444-4444-4444-4444-444444444444': '@/assets/images/mock/logo-2.jpg',
  '55555555-5555-5555-5555-555555555555': '@/assets/images/mock/logo-3.jpg'
};

export const mockUsers: User[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    username: 'joao_common',
    email: 'joao@example.com',
    user_type: 'common',
    address: 'Rua das Flores, 123',
    role: null,
    confirmed: true,
    password: '123',
    avatar: undefined,
    phone: '(71) 99999-1111',
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    username: 'maria_staff',
    email: 'maria@staff.com',
    user_type: 'staff',
    address: null,
    role: 'admin',
    password: '123',
    avatar: undefined,
    phone: '(71) 88888-2222',

  },
  // ESTABELECIMENTOS
  {
    id: '33333333-3333-3333-3333-333333333333',
    username: 'Restaurante da Orla',
    email: 'contato@restaurante.com',
    password: '123',
    user_type: 'establishment',
    address: 'Av. Oceânica, 1234',
    role: 'owner',
    confirmed: true,
    phone: '(71) 99999-1234',
    cnpj: '12.345.678/0001-90',
    min_price: 50,
    max_price: 120,
    coupon_enabled: true,
    coupon_percentage: 10,
    coupon_uses_per_user: 1,
    social: {
      instagram: 'orla_rest',
      facebook: 'orla_rest',
      youtube: '',
      linkedin: '',
    },
    opening_hours: [
      { day: 'Segunda', open: '11:00', close: '22:00' },
      { day: 'Terça', open: '11:00', close: '22:00' },
      { day: 'Quarta', open: '11:00', close: '22:00' },
      { day: 'Quinta', open: '11:00', close: '22:00' },
      { day: 'Sexta', open: '11:00', close: '23:00' },
      { day: 'Sábado', open: '11:00', close: '23:00' },
      { day: 'Domingo', open: '11:00', close: '22:00' },
    ],
    cover_image: coverMap['33333333-3333-3333-3333-333333333333'], // ou use require local
    logo_image: logoMap['33333333-3333-3333-3333-333333333333'],
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    username: 'Bom Baiano',
    email: 'contato@bombaiano.com',
    password: '123',
    user_type: 'establishment',
    address: 'Rua das Laranjeiras, 45',
    role: 'owner',
    confirmed: true,
    phone: '(71) 98888-1234',
    cnpj: '98.765.432/0001-11',
    min_price: 30,
    max_price: 80,
    coupon_enabled: false,
    coupon_percentage: 0,
    coupon_uses_per_user: 0,
    social: {
      instagram: 'bombaiano',
      facebook: 'bombaiano',
      youtube: '',
      linkedin: '',
    },
    opening_hours: [
      { day: 'Segunda', open: '11:00', close: '21:00' },
      // ... repetir para os dias
    ],
    cover_image: coverMap['44444444-4444-4444-4444-444444444444'], // ou use require local
    logo_image: logoMap['44444444-4444-4444-4444-444444444444'],
  },
  {
    id: '55555555-5555-5555-5555-555555555555',
    username: 'Sabores do Dendê',
    email: 'contato@saboresdende.com',
    password: '123',
    user_type: 'establishment',
    address: 'Largo do Pelourinho, 10',
    role: 'owner',
    confirmed: true,
    phone: '(71) 97777-1234',
    cnpj: '11.111.111/0001-22',
    min_price: 40,
    max_price: 90,
    coupon_enabled: true,
    coupon_percentage: 15,
    coupon_uses_per_user: 2,
    social: {
      instagram: 'saboresdende',
      facebook: 'saboresdende',
      youtube: '',
      linkedin: '',
    },
    opening_hours: [
      { day: 'Segunda', open: '11:00', close: '22:00' },
      { day: 'Terça', open: '11:00', close: '22:00' },
      { day: 'Quarta', open: '11:00', close: '22:00' },
      { day: 'Quinta', open: '11:00', close: '22:00' },
      { day: 'Sexta', open: '11:00', close: '23:00' },
      { day: 'Sábado', open: '11:00', close: '23:00' },
      { day: 'Domingo', open: '11:00', close: '22:00' },
    ],
    cover_image: coverMap['55555555-5555-5555-5555-555555555555'], // ou use require local
    logo_image: logoMap['55555555-5555-5555-5555-555555555555'],
  },

  {
    id: '44444444-4444-4444-4444-444444444444',
    username: 'novo_usuario',
    email: 'novo@example.com',
    user_type: 'common',
    address: null,
    role: null,
    confirmed: false,
    password: '123',
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
    id: 'feijoada',
    name: 'feijoada',
    picture: 'feijoada',
    audio: 'https://example.com/audio1.mp3',
    entry_text: 'Descrição da entrada 1',
    category: 'entradas',
    estimated_time: '15 min',
    difficulty_level: 'facil',
    ingredients: [{ name: 'linguica' }, { name: 'sal' }, { name: 'coco' }, { name: 'pimentão' }, { name: 'ovo' }],
  },
  {
    id: 'cozido',
    name: 'cozido',
    picture: 'cozido',
    audio: 'https://example.com/audio2.mp3',
    entry_text: 'Descrição da entrada 2',
    category: 'pratos principais',
    estimated_time: '30 min',
    difficulty_level: 'médio',
    ingredients: [{ name: 'pão' }, { name: 'manteiga' }, { name: 'mandioca' }, { name: 'milho-branco' }, { name: 'frango' }],
  },
  {
    id: 'cuscuz',
    name: 'cuscuz',
    picture: 'cuscuz',
    audio: 'https://example.com/audio2.mp3',
    entry_text: 'Descrição da entrada 3',
    category: 'pratos principais',
    estimated_time: '30 min',
    difficulty_level: 'médio',
    ingredients: [{ name: 'aipim' }, { name: 'sal' }, { name: 'bucho' }, { name: 'milho-branco' }, { name: 'açúcar' }],
  },
  {
    id: 'acarajé',
    name: 'acarajé',
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
    address: 'São Paulo Av. Paulista, 1000 Bela Vista01310-100'
  },
  {
    id: 'event-2',
    name: 'Workshop de Culinária',
    event_date: '2026-03-25T14:30:00',
    description: 'Aprenda a cozinhar pratos italianos',
    address: 'São Paulo Av. Paulista, 1000 Bela Vista01310-100'

  },
  {
    id: 'event-3',
    name: 'Teste culinário',
    event_date: '2026-03-24T14:30:00',
    description: 'Aprenda a cozinhar pratos italianos',
    address: 'São Paulo Av. Paulista, 1000 Bela Vista01310-100'
  },
  {
    id: 'event-4',
    name: 'Bota pra quebrar',
    event_date: '2026-03-23T12:30:00',
    description: 'Aprenda a cozinhar pratos italianos',
    address: 'São Paulo Av. Paulista, 1000 Bela Vista01310-100'

  },
  {
    id: 'event-5',
    name: 'Ebaa',
    event_date: '2026-03-23T11:30:00',
    description: 'Aprenda a cozinhar pratos italianos',
    address: 'São Paulo Av. Paulista, 1000 Bela Vista01310-100'

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