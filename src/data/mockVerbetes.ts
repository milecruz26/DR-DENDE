import type { ImageSourcePropType } from 'react-native';

export type CategoriaVerbete =
  | 'Entrada'
  | 'Sobremesa'
  | 'Acompanhamento'
  | 'Vegetariana'
  | 'Prato Principal';
export type Dificuldade = 'Fácil' | 'Médio' | 'Difícil';

export interface Ingrediente {
  nome: string;
  icone: string; // ex: 'dende', 'sal', 'pimentao'
}

export interface Verbete {
  id: string;
  titulo: string;
  descricaoCurta: string;
  sobre: string;
  categoria: CategoriaVerbete;
  tempoPreparo: string;
  dificuldade: Dificuldade;
  ingredientes: Ingrediente[];
  etapas: string[];
  img: ImageSourcePropType;
}

// NOSSO "BANCO DE DADOS" TEMPORÁRIO
export const MOCK_VERBETES: Verbete[] = [
  {
    id: '1',
    titulo: 'PASSARINHA',
    descricaoCurta: 'A passarinha, apesar de como é chamada, nada tem a ver com uma ave...',
    sobre:
      'A passarinha, apesar de como é chamada, nada tem a ver com uma ave. Na verdade, é o nome popular dado ao prato feito com o baço do boi. Assim como outras vísceras de origem animal, a passarinha possui alto valor nutricional, sendo rica em ferro e vitaminas. Depois de bem temperado, o baço é frito no azeite de dendê e servido, geralmente, com farofa, salada vinagrete e pimenta.',
    categoria: 'Acompanhamento',
    tempoPreparo: '30 min',
    dificuldade: 'Fácil',
    img: require('../../assets/images/pratos/passarinha.png'), // Ajuste o path conforme sua pasta
    ingredientes: [
      { nome: 'Baço bovino', icone: 'dende' },
      { nome: 'Pimentão', icone: 'pimentao' },
      { nome: 'Sal', icone: 'sal' },
      { nome: 'Limão', icone: 'limao' },
      { nome: 'Azeite de Dendê', icone: 'dende' },
    ],
    etapas: [
      'Limpe bem o baço tirando a pele;',
      'Corte em uma espessura menor, fazendo talhos;',
      'Tempere com limão, sal, pimenta e azeite;',
      'Deixe na geladeira por 1 hora para pegar sabor;',
      'Na sequência, frite a iguaria no azeite de dendê bem quente;',
      'Para servir, junte com molho de pimenta, vinagrete, farofa e pronto.',
    ],
  },
  {
    id: '2',
    titulo: 'FEIJOADA BAIANA',
    descricaoCurta:
      'A feijoada baiana é rica em carnes e temperos, feita com feijão mulatinho ou preto.',
    sobre:
      'Diferente da versão carioca, a feijoada baiana tradicionalmente utiliza feijão mulatinho (ou carioquinha) e inclui carnes como charque, calabresa, toucinho e um toque especial de temperos locais. É um prato robusto, ideal para reunir a família nos finais de semana.',
    categoria: 'Prato Principal',
    tempoPreparo: '120 min',
    dificuldade: 'Médio',
    img: require('../../assets/images/pratos/feijoada.png'), // Ajuste o path
    ingredientes: [
      { nome: 'Feijão', icone: 'feijao' },
      { nome: 'Carnes salgadas', icone: 'carne' },
      { nome: 'Calabresa', icone: 'calabresa' },
      { nome: 'Louro', icone: 'louro' },
    ],
    etapas: [
      'Dessalgue as carnes de um dia para o outro;',
      'Cozinhe as carnes mais duras na panela de pressão;',
      'Adicione o feijão e as carnes mais macias e deixe cozinhar;',
      'Faça um refogado de alho e cebola e adicione ao caldo para engrossar;',
      'Sirva com arroz, couve e laranja.',
    ],
  },
  {
    id: '3',
    titulo: 'ACARAJÉ',
    descricaoCurta: 'Bolinho de feijão-fradinho frito no azeite de dendê, recheado com vatapá.',
    sobre:
      'O acarajé é uma especialidade gastronômica da culinária afro-brasileira, feito de massa de feijão-fradinho, cebola e sal, frito em azeite de dendê. Pode ser servido com pimenta, camarão seco, vatapá, caruru e salada. É um símbolo forte da cultura baiana.',
    categoria: 'Entrada',
    tempoPreparo: '60 min',
    dificuldade: 'Difícil',
    img: require('../../assets/images/pratos/passarinha.png'), // Coloquei a mesma img como placeholder
    ingredientes: [
      { nome: 'Feijão-fradinho', icone: 'feijao' },
      { nome: 'Cebola', icone: 'cebola' },
      { nome: 'Azeite de Dendê', icone: 'dende' },
      { nome: 'Sal', icone: 'sal' },
    ],
    etapas: [
      'Deixe o feijão de molho e retire as cascas;',
      'Bata o feijão com cebola e sal até formar uma massa homogênea;',
      'Bata a massa com uma colher de pau até incorporar ar e ficar fofa;',
      'Modele os bolinhos e frite em azeite de dendê bem quente;',
      'Corte ao meio e recheie a gosto.',
    ],
  },
];

// SIMULAÇÃO DE API (O que você vai trocar pelo Axios depois)
export const apiGetVerbetes = async (): Promise<Verbete[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_VERBETES), 500); // Simula 500ms de internet
  });
};

export const apiGetVerbeteById = async (id: string): Promise<Verbete | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_VERBETES.find((v) => v.id === id));
    }, 300);
  });
};
