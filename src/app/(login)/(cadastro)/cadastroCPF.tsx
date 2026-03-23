import BgLogin from '@/components/BackgroundThema/BgLogin';
import { PrimaryButton } from '@/components/Buttons/PrimaryButton';
import { TertiaryButton } from '@/components/Buttons/TertiaryButton';
import { useCreateUser } from '@/hooks/useUsers';
import { validarSenha } from '@/utils/validators';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import Colors from '../../../theme/Colors';
const { NEUTRAL } = Colors;

export default function CadastroCPF() {
  // Estados para os inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  // Estados para controlar a visibilidade
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  // Estados para os erros
  const [erroSenha, setErroSenha] = useState<string | null>(null);
  const [erroConfirmacao, setErroConfirmacao] = useState<string | null>(null);

  const createUserMutation = useCreateUser();


  const handleCadastro = async () => {
    setErroSenha(null);
    setErroConfirmacao(null);

    const erroValidacao = validarSenha(password);
    if (erroValidacao) {
      setErroSenha(erroValidacao);
      return;
    }
    if (password !== confirmarSenha) {
      setErroConfirmacao("As senhas não coincidem.");
      return;
    }
    // console.log('Dados para cadastro no form de cadastro:', { name, email, telefone, password });
    try {
      await createUserMutation.mutateAsync({
        username: name,
        email: email,
        password: password,
        user_type: 'common',
        address: null,
        role: null,
      });
      router.push("/(login)/(cadastro)/emailEnviadoCadastro");
    } catch (error) {
      console.error(error);
      alert('Erro ao criar conta. Tente novamente.');
    }
  };
  return (
    <BgLogin logo={false} card>
      <Text style={styles.cardTitle}>Cadastre-se</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Larissa Duarte"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: seunome@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="(71) 99999-9999"
          keyboardType="numeric"
          value={telefone}
          onChangeText={setTelefone}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.inputPassword, erroSenha && styles.inputError]}
            placeholder="********"
            secureTextEntry={!mostrarSenha} // Inverte com base no estado
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setMostrarSenha(!mostrarSenha)}
          >
            <Ionicons
              name={mostrarSenha ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        {erroSenha && <Text style={styles.errorText}>{erroSenha}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirmar Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.inputPassword, erroConfirmacao && styles.inputError]}
            placeholder="********"
            secureTextEntry={!mostrarConfirmarSenha}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
          >
            <Ionicons
              name={mostrarConfirmarSenha ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        {erroConfirmacao && <Text style={styles.errorText}>{erroConfirmacao}</Text>}
      </View>
      <View style={{ gap: 8, marginTop: 10 }}>
        <PrimaryButton
          title='Finalizar cadastro'
          onPress={handleCadastro}
        />
        <Link href="/(login)/(cadastro)/perfil" asChild>
          <TertiaryButton title='Voltar' onPress={() => { }} />
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
  inputError: {
    borderColor: '#D32F2F', // Vermelho para indicar erro
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: NEUTRAL.base,
    backgroundColor: NEUTRAL.lighter,
    borderRadius: 8,
    width: '100%',
  },
  inputPassword: {
    flex: 1, // Ocupa todo o espaço menos o do ícone
    padding: 12,
    fontSize: 16,
    color: NEUTRAL.dark,
  },
  eyeIcon: {
    paddingHorizontal: 12,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    marginTop: 4,
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