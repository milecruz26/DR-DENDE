import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ConviteEnviado() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.circle}>
          <Feather name="check" size={50} color="#FFF" />
        </View>

        <Text style={styles.title}>E-mail enviado</Text>
        <Text style={styles.description}>O e-mail foi enviado com sucesso para o convidado.</Text>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.navigate('/(protegida)/configuracoes')}
        >
          <Text style={styles.btnText}>Voltar para o início</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center' },
  container: { alignItems: 'center', paddingHorizontal: 30 },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#34523B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },
  btn: {
    backgroundColor: '#34523B',
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});
