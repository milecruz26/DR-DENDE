import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import BgLogin from '@/components/BackgroundThema/BgLogin'
import { PrimaryButton } from '@/components/Buttons/PrimaryButton'
import { SecondaryButton } from '@/components/Buttons/SecondaryButton'
import { TertiaryButton } from '@/components/Buttons/TertiaryButton'
import LoginLoading from '@/components/LoginLoading'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'

export default function Login() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true); // Ativa a tela de carregamento que você quer

    try {
      // Simulação de chamada de API / Login
      await new Promise(resolve => setTimeout(resolve, 3000));

      router.replace('/(protegida)'); // Navega para a próxima tela
    } catch (error) {
      console.log(error);
    } finally {
      // Importante: Não desative o loading aqui se for navegar, 
      // para evitar que a tela de login "pisque" antes de mudar.
    }
  };
  return (
    <>
      <LoginLoading visible={loading} />

      <BgLogin card >
        <Text style={styles.cardTitle}>Fazer login</Text>


        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: seunome@gmail.com"
            keyboardType="email-address"
          />
          <Text style={styles.helperText}>ⓘ Insira o email cadastrado</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            secureTextEntry
          />
        </View>
        <View style={{ gap: 8 }}>

          <PrimaryButton
            title='Entrar'
            onPress={handleLogin}

          />

          <Link href="/(login)/(cadastro)/perfil" asChild>
            <SecondaryButton
              title='Criar conta'
              onPress={() => { }}

            />
          </Link>

          <Link href="/(login)/(esqueceuSenha)/emailEsqueceuSenha" asChild>
            <TertiaryButton
              title='Esqueci a senha'

              onPress={() => { }}
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
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBE6',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 26,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: 16,
    padding: 24,
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
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  helperText: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  buttonEntrar: {
    backgroundColor: '#3A5A40',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '100%'
  },
  buttonEntrarText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',

  },
  buttonCriar: {
    borderWidth: 1,
    borderColor: '#3A5A40',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '100%'
  },
  buttonCriarText: {
    color: '#3A5A40',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    textAlign: 'center',
    color: '#3A5A40',
    marginTop: 15,
    fontSize: 16,
    textDecorationLine: 'none',
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
  logoApoioFinanceiro: {
    width: '100%',
    height: 60,
    resizeMode: 'contain',
    marginTop: 26,
    marginBottom: 26

  }
})