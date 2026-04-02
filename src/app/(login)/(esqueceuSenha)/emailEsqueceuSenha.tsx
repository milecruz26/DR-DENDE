import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import BgLogin from '@/components/BackgroundThema/BgLogin';
import { PrimaryButton } from '@/components/Buttons/PrimaryButton';
import { TertiaryButton } from '@/components/Buttons/TertiaryButton';
import Colors from '../../../theme/Colors';

const { NEUTRAL } = Colors;

export default function EmailEsqueceuSenha() {
  return (
    <BgLogin logo={false} card>
      <Text style={styles.cardTitle}>Esqueceu sua senha?</Text>
      <Text style={styles.cardSubTitle}>
        Digite seu email para receber as instruções de recuperação
      </Text>

      {/* <View style={{ gap: 24 }}> */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: seunome@gmail.com"
          keyboardType="email-address"
        />
      </View>
      <View style={{ gap: 8 }}>
        <Link href="/(login)/(esqueceuSenha)/emailEnviado" asChild>
          <PrimaryButton title="Enviar instruções" onPress={() => {}} />
        </Link>
        <Link href="/(login)" asChild>
          <TertiaryButton title="Voltar" onPress={() => {}} />
        </Link>
      </View>

      {/* </View> */}
    </BgLogin>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBE6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  logoSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A5A40',
    fontStyle: 'italic',
  },

  card: {
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: 16,
    padding: 24,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  cardSubTitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: NEUTRAL.deep,
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: NEUTRAL.base,
    backgroundColor: NEUTRAL.lighter,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    width: '100%',
  },
});
