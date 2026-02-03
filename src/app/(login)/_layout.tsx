
import { Stack } from 'expo-router'
import React from 'react'

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen name="perfil" options={{ headerShown: false }} />

      <Stack.Screen name="cadastro" options={{ headerShown: false }} />
    </Stack>

  )
}