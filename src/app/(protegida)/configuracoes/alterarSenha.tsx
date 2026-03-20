import { PrimaryButton } from '@/components/Buttons/PrimaryButton';
import { TertiaryButton } from '@/components/Buttons/TertiaryButton';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const COLORS = {
  primary: '#34523B',
  white: '#FFFFFF',
  textDark: '#000000',
  textLight: '#666666',
  border: '#E0E0E0',
  inputBg: '#FFFFFF',
};

interface Convidado {
  id: string;
  nome: string;
  email: string;
}

const DADOS_INICIAIS: Convidado[] = [
  { id: '1', nome: 'Ian Almeida Souza', email: 'ianalmeida@gmail.com' },
  { id: '2', nome: 'Virginia Santos', email: 'virginiasantos@gmail.com' },
];

export default function AlterarSenha() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [convidados, setConvidados] = useState<Convidado[]>(DADOS_INICIAIS);

  const handleResetarSenha = () => {
    console.log('Senha alterada com sucesso!');
  };

  return (
    <View style={styles.root}>
      {/* Header Centralizado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alterar Senha</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.cardTitle}>Altere a sua senha</Text>
        <Text style={styles.cardSubTitle}>Digite sua nova senha nos campos abaixo.</Text>

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
            onPress={handleResetarSenha}

          />
          <Link href="/(login)" asChild>
            <TertiaryButton
              title='Voltar ao login'
              onPress={() => { }}
            />
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  root: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  backText: { color: COLORS.primary, fontSize: 16 },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 60
  },
  content: { flex: 1, paddingHorizontal: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16
  },
  btnEnviar: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35
  },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  subTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  itemLead: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemName: { fontSize: 16, fontWeight: '500' },
  itemEmail: { fontSize: 13, color: COLORS.textLight },
});