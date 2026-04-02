import { Stack } from 'expo-router';

export default function ConfiguracoesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="meuPerfil" />
      <Stack.Screen name="denunciar" />
      <Stack.Screen name="confirmacaoDenuncia" />
      <Stack.Screen name="moderarDenuncias" />
    </Stack>
  );
}
