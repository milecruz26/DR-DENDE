// src/contexts/AuthContext.tsx
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'usuario' | 'equipe' | 'estabelecimento';

interface User {
  email: string;
  role: UserRole;
  nome: string;
  isFirstLogin: boolean;
}

interface AuthContextData {
  user: User | null;
  signIn: (email: string) => Promise<boolean>;
  signOut: () => void;
}

// 1. Nossos 3 usuários de mock para teste
const MOCK_USERS: Record<string, User> = {
  'usuario@teste.com': { email: 'usuario@teste.com', role: 'usuario', nome: 'João (Usuário)', isFirstLogin: true },
  'equipe@teste.com': { email: 'equipe@teste.com', role: 'equipe', nome: 'Maria (Equipe)', isFirstLogin: false },
  'estab@teste.com': { email: 'estab@teste.com', role: 'estabelecimento', nome: 'Bar do Zé', isFirstLogin: false },
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const signIn = async (email: string) => {
    // Simula o tempo de API
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Chamada real para o backend
    // const response = await api.post('/login', { email });
    // const { token, user } = response.data;

    // Simulação:
    // const token = "abc-123-fake-token"; 

    // SALVAR O TOKEN DE FORMA SEGURA
    // await SecureStore.setItemAsync('user_token', token);
    // setUser(MOCK_USERS[email]);
    // return true;

    const mockUser = MOCK_USERS[email.toLowerCase()];
    if (mockUser) {
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const signOut = async () => {
    try {
      // 1. Remove o token do armazenamento seguro
      await SecureStore.deleteItemAsync('user_token');

      // 2. Limpa o usuário do estado global
      setUser(null);

      // 3. Redireciona para a tela de login (fora da rota protegida)
      router.replace('/(login)');
    } catch (e) {
      console.error("Erro ao deslogar:", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);