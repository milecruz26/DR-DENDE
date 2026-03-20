import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const COLORS = {
  primary: '#34523B',
  bg: '#FFFBE6',
  textDark: '#444',
  textLight: '#666',
  border: '#DDD',
};

export default function ConfirmacaoDenuncia() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      {/* Header com botão Voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Denúncia</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.successTitle}>Denúncia registrada!</Text>

        <Text style={styles.description}>
          Obrigado(a) por colaborar com a equipe Dr dendê a fazer deste ambiente o mais seguro para todos.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Em breve a equipe deverá visualizar e avaliar sua denúncia
          </Text>
        </View>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.push('/configuracoes')}
        >
          <Text style={styles.homeButtonText}>Voltar para configurações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  backText: { color: COLORS.primary, fontSize: 16 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: COLORS.textDark, marginRight: 60 },

  content: { flex: 1, paddingHorizontal: 30, justifyContent: 'center', alignItems: 'center' },

  successTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 15 },

  description: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30
  },

  infoBox: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 40,
    backgroundColor: 'rgba(255,255,255,0.5)'
  },
  infoText: { fontSize: 16, color: COLORS.textLight, textAlign: 'center', lineHeight: 22 },

  homeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center'
  },
  homeButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});