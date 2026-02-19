import { MockTabBar } from '@/components/MockTabBar';
import { Slot } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ProtegidaLayout() {
  return (
    <View style={styles.container}>
      {/* O Slot renderiza a tela atual (index, verbete, etc.) */}
      <View style={styles.content}>
        <Slot />
      </View>

      {/* O seu Menu fica fixo aqui embaixo, fora do Slot */}
      <View style={styles.tabBarContainer}>
        <MockTabBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBE6', // Cor de fundo global
  },
  content: {
    flex: 1, // Faz o conteúdo ocupar todo o espaço acima da TabBar
  },
  tabBarContainer: {
    // Garante que a TabBar tenha uma altura definida ou se ajuste ao conteúdo
    // e fique sempre no rodapé
    backgroundColor: 'transparent',
    zIndex: 999,
  },
});