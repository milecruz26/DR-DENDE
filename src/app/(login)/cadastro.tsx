import { StyleSheet } from 'react-native'

import React from 'react'
import { Text, View } from 'react-native'

export default function Cadastro() {
  return (
    <View style={styles.container}>
      <Text>cadastro </Text>
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