import BgLogin from "@/components/BackgroundThema/BgLogin";
import { PrimaryButton } from "@/components/Buttons/PrimaryButton";
import { TertiaryButton } from "@/components/Buttons/TertiaryButton";
import LoginLoading from "@/components/LoginLoading";
import { validarSenha } from '@/utils/validators';
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Colors from '../../../theme/Colors';
const { NEUTRAL } = Colors;

export default function ResetarSenha() {
  const [loading, setLoading] = useState(false);
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [erroSenha, setErroSenha] = useState<string | null>(null);
  const [erroConfirmacao, setErroConfirmacao] = useState<string | null>(null);

  const handleResetarSenha = async () => {
    setErroSenha(null);
    setErroConfirmacao(null);

    const erroValidacao = validarSenha(senha);
    if (erroValidacao) {
      setErroSenha(erroValidacao);
      return;
    }

    if (senha !== confirmarSenha) {
      setErroConfirmacao("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      // Aqui entraria a chamada da API real
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("Senha alterada com sucesso!");
      router.replace('/(login)'); // Volta para o login
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoginLoading visible={loading} />
      <BgLogin logo={false} card>
        <Text style={styles.cardTitle}>Altere a sua senha</Text>
        <Text style={styles.cardSubTitle}>Insira e confirme a sua nova senha para realizar a alteração.</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={[styles.input, erroSenha && styles.inputError]}
            placeholder="********"
            secureTextEntry
            value={senha}
            onChangeText={(texto) => {
              setSenha(texto);
              setErroSenha(null);
            }}
          />
          {erroSenha && <Text style={styles.errorText}>{erroSenha}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirmar senha</Text>
          <TextInput
            style={[styles.input, erroConfirmacao && styles.inputError]}
            placeholder="********"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={(texto) => {
              setConfirmarSenha(texto);
              setErroConfirmacao(null);
            }}
          />
          {erroConfirmacao && <Text style={styles.errorText}>{erroConfirmacao}</Text>}
        </View>

        <View style={{ gap: 8, marginTop: 10 }}>
          <PrimaryButton
            title='Alterar senha'
            onPress={handleResetarSenha}
          />
          <Link href="/(login)" asChild>
            <TertiaryButton title='Voltar ao login' onPress={() => { }} />
          </Link>
        </View>
      </BgLogin>
    </>
  )
};

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
  inputError: {
    borderColor: '#D32F2F',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    marginTop: 4,
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
