// context/AuthContext.tsx
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useLogin } from '@/hooks/useLogin';
import { useQueryClient } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext } from 'react';

const TOKEN_KEY = 'auth_token';

interface AuthContextData {
  user: ReturnType<typeof useCurrentUser>['data'];
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const { data: user, isLoading: isLoadingUser, refetch } = useCurrentUser();
  const { mutateAsync: loginMutation, isPending: isLoggingIn } = useLogin();

  const signIn = async (email: string, password: string) => {
    await loginMutation({ email, password });
    await refetch();
  };

  const signOut = async () => {
    // Remove o token
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    // Invalida a query do usuário para que ela seja recarregada (e falhe)
    await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    // Remove os dados do cache para garantir que não haja resquícios
    queryClient.removeQueries({ queryKey: ['currentUser'] });
  };

  const value = {
    user,
    isLoading: isLoadingUser || isLoggingIn,
    isAuthenticated: !!user,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);