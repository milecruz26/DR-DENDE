// hooks/useDeepLink.ts

import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { api } from '@/services/apiTeste';

export const useDeepLink = () => {
  useEffect(() => {
    const handleDeepLink = async (event: Linking.EventType) => {
      const url = event.url;
      if (url) {
        // Extrai o token da query string
        const match = url.match(/[?&]token=([^&]+)/);
        if (match && match[1]) {
          const token = decodeURIComponent(match[1]);
          try {
            // Chama o endpoint de confirmação (mock)
            await api.get(`/confirm?token=${token}`);
            console.log(`[MOCK] Confirmando usuário com token: ${token}`);
            // Redireciona para a tela de sucesso
            router.replace('/(login)/(cadastro)/emailConfirmado');
          } catch (error) {
            console.error('Falha na confirmação', error);
            alert('Link inválido ou expirado.');
          }
        }
      }
    };

    // Captura links quando o app já está aberto
    const subscription = Linking.addEventListener('url', handleDeepLink);
    // Captura link que abriu o app
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url } as any);
    });

    return () => subscription.remove();
  }, []);
};
