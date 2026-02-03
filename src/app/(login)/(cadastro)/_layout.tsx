
import { Stack } from 'expo-router'
import React from 'react'

export default function CadastroLayout() {
  return (
    <Stack>
      <Stack.Screen name="perfil" options={{ headerShown: false }} />
      <Stack.Screen name='cadastroCNPJ' options={{ headerShown: false }} />
      <Stack.Screen name='cadastroCPF' options={{ headerShown: false }} />
    </Stack>

  )
}