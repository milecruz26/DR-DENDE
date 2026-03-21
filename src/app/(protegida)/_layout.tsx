import LoginLoading from '@/components/LoginLoading';
import { MockTabBar } from '@/components/MockTabBar';
import { useAuth } from '@/context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Redirect, Slot } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProtegidaLayout() {
  const insets = useSafeAreaInsets();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoginLoading visible={isLoading} />;
  if (!isAuthenticated) return <Redirect href="/(login)" />;

  return (
    <View style={styles.container}>
      {/* O Slot renderiza a tela atual (index, verbete, etc.) */}
      <LinearGradient
        colors={['#FFF', '#FFF0C8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.8 }}
        style={styles.container}
      >
        <View style={styles.content}>
          <Slot />
        </View>
      </LinearGradient>

      {/* O seu Menu fica fixo aqui embaixo, fora do Slot */}
      <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
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