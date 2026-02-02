import { StyleSheet } from 'react-native'

import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

export default function Login() {
  return (
    <View style={styles.container}>
      <Text>Login </Text>
      <Link href="../(login)/cadastro">Ir para Cadastro</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})