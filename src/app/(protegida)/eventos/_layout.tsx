import { Stack } from 'expo-router';

export default function EventosLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />

    </Stack>
  );
}