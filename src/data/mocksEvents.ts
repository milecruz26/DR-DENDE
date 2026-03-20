// src/data/mockEvents.ts

export interface Evento {
  id: string;
  nome: string;
  data: string; // Formato YYYY-MM-DD para facilitar a filtragem
  horario: string;
  descricao: string;
  cidade: string;
  cep: string;
  rua: string;
  bairro: string;
}

// Criando 3 eventos. Note que coloquei um para o dia de "hoje" (ajuste a data se necessário para testar)
export let MOCK_EVENTOS: Evento[] = [
  {
    id: '1',
    nome: 'FEIJOADA DE SEU ZÉ',
    data: new Date().toISOString().split('T')[0], // Retorna YYYY-MM-DD de hoje
    horario: '12:00',
    descricao: 'Tradicional feijoada com samba de roda, cerveja gelada e muita animação para reunir a comunidade.',
    cidade: 'Salvador',
    cep: '40000-000',
    rua: 'Rua do Samba, 10',
    bairro: 'Centro Histórico'
  },
  {
    id: '2',
    nome: 'CEIA BENEFICENTE',
    data: new Date().toISOString().split('T')[0], // Hoje também
    horario: '19:30',
    descricao: 'Arrecadação de fundos e distribuição de alimentos para famílias em situação de vulnerabilidade.',
    cidade: 'Salvador',
    cep: '41000-000',
    rua: 'Av. da Paz, 45',
    bairro: 'Liberdade'
  },
  {
    id: '3',
    nome: 'Reunião geral',
    data: '2026-12-25', // Uma data fixa no futuro
    horario: '14:00',
    descricao: 'Encontro mensal para discutir melhorias no bairro e organizar o festival de verão.',
    cidade: 'Lauro de Freitas',
    cep: '42700-000',
    rua: 'Travessa da União, 2',
    bairro: 'Itinga'
  }
];

// 2. Função simuladora de "POST" do Backend
export const adicionarEventoMock = (novoEvento: Evento) => {
  MOCK_EVENTOS = [...MOCK_EVENTOS, novoEvento];
  console.log("Evento adicionado ao Mock com sucesso!", MOCK_EVENTOS);
};
