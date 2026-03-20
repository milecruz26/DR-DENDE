import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import BgLogin from '@/components/BackgroundThema/BgLogin';
import { PrimaryButton } from '@/components/Buttons/PrimaryButton';
import { TertiaryButton } from '@/components/Buttons/TertiaryButton';

import { Link } from 'expo-router';
import React from 'react';
import Colors from '../../../theme/Colors';
const { NEUTRAL } = Colors;

export default function CadastroCPF() {
  return (
    <BgLogin logo={false} card>
      <Text style={styles.cardTitle}>Cadastre-se</Text>


      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Larissa Duarte"
          keyboardType="default"
        />

      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: seunome@gmail.com"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="(71) 99999-9999"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          secureTextEntry
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirmar Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          secureTextEntry
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
            onPress={() => {
            }}
          />
        </Link>


      </View>
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>Ou</Text>
        <View style={styles.line} />
      </View>
      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => { }}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }}
          style={styles.googleIcon}
        />
        <Text style={styles.googleText}>Faça login com Google</Text>
      </TouchableOpacity>
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
    marginVertical: 24
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#EEE',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#AAA',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#DFDFE0',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    boxShadow: '0px 1px 2px 0px rgba(25, 25, 28, 0.04)',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
    color: '#333',
  },

})