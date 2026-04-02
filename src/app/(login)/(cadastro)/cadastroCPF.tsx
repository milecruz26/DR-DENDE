import BgLogin from '@/components/BackgroundThema/BgLogin';
import { PrimaryButton } from '@/components/Buttons/PrimaryButton';
import { TertiaryButton } from '@/components/Buttons/TertiaryButton';
import { useCreateUser } from '@/hooks/useUsers';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import Colors from '../../../theme/Colors';

const { NEUTRAL } = Colors;

const cadastroCPFSchema = z.object({
  username: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  phone: z.string().optional(),
  password: z.string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres.')
    .regex(/[A-Z]/, 'A senha deve ter pelo menos 1 letra maiúscula.')
    .regex(/[a-z]/, 'A senha deve ter pelo menos 1 letra minúscula.')
    .regex(/[0-9]/, 'A senha deve ter pelo menos 1 número.')
    .regex(/[!@#$%^&*(),.?":{}<>]/, 'A senha deve ter pelo menos 1 caractere especial.'),
  confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem.',
  path: ['confirmPassword'],
});

type CadastroCPFFormData = z.infer<typeof cadastroCPFSchema>;

export default function CadastroCPF() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const createUserMutation = useCreateUser();

  const { control, handleSubmit, setError, formState: { errors } } = useForm<CadastroCPFFormData>({
    resolver: zodResolver(cadastroCPFSchema),
    defaultValues: { username: '', email: '', phone: '', password: '', confirmPassword: '' },
  });

  const onSubmit = (data: CadastroCPFFormData) => {
    const { username, email, password } = data;
    createUserMutation.mutate({ username, email, password }, {
      onSuccess: () => {
        router.push('/(login)/(cadastro)/emailEnviadoCadastro');
      },
      onError: () => {
        setError('root', { message: 'Erro ao criar conta. Tente novamente.' });
      },
    });
  };

  return (
    <BgLogin logo={false} card>
      <Text style={styles.cardTitle}>Cadastre-se</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome completo</Text>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder="Ex: Larissa Duarte"
                value={value}
                onChangeText={onChange}
              />
              {error && <Text style={styles.errorText}>{error.message}</Text>}
            </>
          )}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder="Ex: seunome@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
              />
              {error && <Text style={styles.errorText}>{error.message}</Text>}
            </>
          )}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Telefone</Text>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="(71) 99999-9999"
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Senha</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.inputPassword, error && styles.inputError]}
                  placeholder="********"
                  secureTextEntry={!showPassword}
                  value={value}
                  onChangeText={onChange}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>
              {error && <Text style={styles.errorText}>{error.message}</Text>}
            </>
          )}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirmar Senha</Text>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.inputPassword, error && styles.inputError]}
                  placeholder="********"
                  secureTextEntry={!showConfirmPassword}
                  value={value}
                  onChangeText={onChange}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>
              {error && <Text style={styles.errorText}>{error.message}</Text>}
            </>
          )}
        />
      </View>

      {errors.root && <Text style={styles.errorText}>{errors.root.message}</Text>}

      <View style={{ gap: 8, marginTop: 10 }}>
        <PrimaryButton title='Finalizar cadastro' onPress={handleSubmit(onSubmit)} isLoading={createUserMutation.isPending} />
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
  );
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
    flex: 1,
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
});
