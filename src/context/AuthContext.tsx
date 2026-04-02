import type React from 'react';
import { createContext, useContext } from 'react';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries';
import { useLogin } from '@/hooks/useLogin';
import { storage } from '@/utils/storage';

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
  const { data: user, isLoading: isLoadingUser } = useCurrentUser();
  const { mutateAsync: loginMutation, isPending: isLoggingIn } = useLogin();
  const invalidate = useInvalidateQueries();
  const signIn = async (email: string, password: string, options?: SignInOptions) => {
    try {
      await loginMutation({ email, password });
      options?.onSuccess?.();
    } catch (error) {
      options?.onError?.(error);
      console.log('ERROR NO SIGN AUTH CONTEXT:', error);
    }
  };

  const signOut = async () => {
    await storage.deleteItem(STORAGE_KEYS.TOKEN);
    await storage.deleteItem(STORAGE_KEYS.USER_TYPE);
    await storage.deleteItem(STORAGE_KEYS.STAFF_USER);
    invalidate('getCurrentUser');
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
