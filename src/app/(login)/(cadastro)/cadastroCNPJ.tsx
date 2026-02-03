import { StyleSheet, Text, TextInput, View } from 'react-native';

import BgLogin from '@/components/BackgroundThema/BgLogin';
import { PrimaryButton } from '@/components/Buttons/PrimaryButton';
import { TertiaryButton } from '@/components/Buttons/TertiaryButton';

import { Link } from 'expo-router';
import React from 'react';
import Colors from '../../../theme/Colors';
const { NEUTRAL } = Colors;

export default function CadastroCNPJ() {
  return (
    <BgLogin logo={false}>
      <Text style={styles.cardTitle}>Cadastre-se</Text>


      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome da empresa</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Restaurante"
          keyboardType="email-address"
        />

      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>CNPJ</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 00.000.000/0000-00"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Localização</Text>
        <TextInput
          style={styles.input}
          placeholder="Cidade, Estado"
          keyboardType="email-address"
        />
      </View>


      <View style={{ gap: 8 }}>

        <PrimaryButton
          title='Finalizar cadastro'
          onPress={() => { }}

        />
        <Link href="/(login)/(cadastro)/perfil" asChild>
          <TertiaryButton
            title='Voltar'
            onPress={() => { }}
          />
        </Link>
      </View>
    </BgLogin>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBE6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: NEUTRAL.lighter,
    minWidth: 354,
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
    color: NEUTRAL.dark,
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: NEUTRAL.deep,
    fontSize: 12
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

})