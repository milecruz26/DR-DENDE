
import { Stack } from 'expo-router'
import React from 'react'

export default function ResetarSenhaLayout() {
  return (
    <Stack>
      <Stack.Screen name="emailEsqueceuSenha" options={{ headerShown: false }} />
      <Stack.Screen name="emailEnviado" options={{ headerShown: false }} />
      <Stack.Screen name="resetarSenha" options={{ headerShown: false }} />
      <Stack.Screen name="verificarCodigo" options={{ headerShown: false }} />
    </Stack>

  )
}