// src/contexts/AuthContext.tsx
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

  const signIn = async (email: string) => {
    // Simula o tempo de API
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockUser = MOCK_USERS[email.toLowerCase()];
    if (mockUser) {
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);