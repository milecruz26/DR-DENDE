import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { EntryProvider } from '@/context/EntryContext';
import { useDeepLink } from '@/hooks/useDeepLink';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Mocks desativados — integração direta com API
// import '../mocks/mockHandlers';

export { ErrorBoundary } from 'expo-router';

const queryClient = new QueryClient();

// Impede o Splash Screen de sumir antes de carregar os assets
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useDeepLink();
  const [loaded, error] = useFonts({
    // Carregamos a referência principal da família
    FiraSansCondensed: require('../../assets/fonts/FiraSansCondensed-Regular.ttf'),
    OfertaDoDia: require('../../assets/fonts/Oferta-do-Dia.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <EntryProvider>
          <SafeAreaProvider>
            <Stack>
              <Stack.Screen name="(login)" options={{ headerShown: false }} />
              <Stack.Screen name="(protegida)" options={{ headerShown: false }} />
            </Stack>
          </SafeAreaProvider>
        </EntryProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
