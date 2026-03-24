
// import { useDeepLink } from '@/hooks/useDeepLink';
import { Stack } from 'expo-router';
import React from 'react';

export default function LoginLayout() {
  // useDeepLink();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name='(cadastro)' options={{ headerShown: false }} />
      <Stack.Screen name='(esqueceuSenha)' options={{ headerShown: false }} />

    </Stack>

  )
}