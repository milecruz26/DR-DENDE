import BgLogin from "@/components/BackgroundThema/BgLogin";
import { PrimaryButton } from "@/components/Buttons/PrimaryButton";
import { TertiaryButton } from "@/components/Buttons/TertiaryButton";
import LoginLoading from "@/components/LoginLoading";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Colors from '../../../theme/Colors';
const { NEUTRAL } = Colors;

export default function ResetarSenha() {
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
      <BgLogin logo={false}>
        <Text style={styles.cardTitle}>Qual é o seu perfil?</Text>
        <Text style={styles.cardSubTitle}>Escolha a opção que melhor descreve você para personalizar sua experiência</Text>

        {/* <View style={{ gap: 24 }}> */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            secureTextEntry
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirmar senha</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            secureTextEntry
          />
        </View>
        <View style={{ gap: 8 }}>

          <PrimaryButton
            title='Alterar senha'
            onPress={handleLogin}

          />
          <Link href="/(login)" asChild>
            <TertiaryButton
              title='Voltar ao login'
              onPress={() => { }}
            />
          </Link>
        </View>

        {/* </View> */}
      </BgLogin>
    </>
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

});
