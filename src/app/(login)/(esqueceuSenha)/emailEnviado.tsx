import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BgLogin from '@/components/BackgroundThema/BgLogin';
import { PrimaryButton } from '@/components/Buttons/PrimaryButton';
import { SecondaryButton } from '@/components/Buttons/SecondaryButton';
import { TertiaryButton } from '@/components/Buttons/TertiaryButton';
import Colors from '@/theme/Colors';

const { NEUTRAL } = Colors;

export default function EmailEnviado() {
  return (
    <BgLogin logo={false} card>
      <Text style={styles.cardTitle}>Email enviado!</Text>
      <Text style={styles.cardSubTitle}>Enviamos um código de verificação para seu@email.com</Text>

      <View style={styles.containerText}>
        <Text style={styles.textAviso}>
          Verifique sua caixa de entrada e spam. O código expira em 10 minutos.
        </Text>
      </View>

      <View style={{ gap: 8 }}>
        <Link href="/(login)/(esqueceuSenha)/verificarCodigo" asChild>
          <PrimaryButton title="Já recebi o código" onPress={() => {}} />
        </Link>
        <SecondaryButton title="Reenviar código" onPress={() => {}} />
        <Link href="/(login)" asChild>
          <TertiaryButton title="Voltar" onPress={() => {}} />
        </Link>
      </View>
    </BgLogin>
  );
}

const styles = StyleSheet.create({
  containerText: {
    borderWidth: 1,
    borderColor: NEUTRAL.base,
    backgroundColor: NEUTRAL.lighter,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  textAviso: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
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
