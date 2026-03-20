import { SecondaryButton } from '@/components/Buttons/SecondaryButton';
import EventCalendarList from '@/components/Eventos/ListaEventos';
import { Header } from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Eventos() {
  const { user } = useAuth();
  return (
    <LinearGradient colors={['#FFF', '#FFF0C8']} style={styles.container}>
      <Header />
      <SafeAreaView style={styles.scrollContent}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.textPage}>Eventos</Text>

          {user?.role !== 'usuario' && (

            <SecondaryButton
              title="+ Criar Evento"
              onPress={() => router.push('/(protegida)/configuracoes/adicionarEvento')}
              size='small'
            />)
          }
        </View>

        {/* O COMPONENTE REUTILIZÁVEL AQUI */}
        <EventCalendarList />

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  textPage: {
    fontSize: 18,
    fontWeight: '700', // Modificado para string (no React Native weights são strings)
    lineHeight: 24,
    letterSpacing: 0.36,
    color: '#454545',
    marginVertical: 32
  },
  eventContainer: {
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 24,
    gap: 24,
    marginTop: 24
  },
  eventList: {
    gap: 8,
  },
  emptyStateText: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 10
  }
});