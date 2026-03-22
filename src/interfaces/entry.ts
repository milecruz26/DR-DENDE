export interface Ingredient {
  // estrutura não definida no PDF, exemplo simples
  name: string;
  quantity?: string;
}

export interface Entry {
  id: string;                    // UUID
  name: string;
  picture: string;               // caminho/URL da imagem
  audio: string;                 // caminho/URL do áudio
  entry_text: string;
  category: string;              // ex: "entradas"
  estimated_time: string;
  difficulty_level: string;      // ex: "facil"
  ingredients: Ingredient[];     // array de ingredientes
}