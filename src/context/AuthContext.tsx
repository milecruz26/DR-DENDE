import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useLogin } from '@/hooks/useLogin';
import { storage } from '@/utils/storage';
import { useQueryClient } from '@tanstack/react-query';
import React, { createContext, useContext } from 'react';

const TOKEN_KEY = 'auth_token';

interface SignInOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

interface AuthContextData {
  user: ReturnType<typeof useCurrentUser>['data'];
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string, options?: SignInOptions) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const { data: user, isLoading: isLoadingUser } = useCurrentUser();
  const { mutateAsync: loginMutation, isPending: isLoggingIn } = useLogin();

  const signIn = async (email: string, password: string, options?: SignInOptions) => {
    try {
      await loginMutation({ email, password });
      options?.onSuccess?.();
    } catch (error) {
      options?.onError?.(error);
    }
  };

  const signOut = async () => {
    // Remove o token
    await storage.deleteItem(TOKEN_KEY);
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