import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const COLORS = {
  primary: '#34523B', // Verde escuro da marca
  bg: '#FFFBE6',      // Fundo creme
  textDark: '#444',
  textLight: '#999',
  border: '#EEE',
  required: '#E74C3C', // Vermelho para campos obrigatórios
};

// Componente auxiliar para os rótulos com asterisco
const InputLabel = ({ label, required = false }: { label: string; required?: boolean }) => (
  <View style={styles.labelContainer}>
    {required && <Text style={styles.requiredAsterisk}>*</Text>}
    <Text style={styles.inputLabel}>{label}</Text>
  </View>
);

export default function MeuPerfil() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState('Usuário');
  const [email, setEmail] = useState('user@email.com.br');
  const [phone, setPhone] = useState('(71) 00000-0000');
  const [city, setCity] = useState('');
  const [cep, setCep] = useState('');

  // Solicitar permissão para acessar a galeria na montagem
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Desculpe', 'Precisamos de permissão para acessar a galeria para alterar a foto.');
        }
      }
    })();
  }, []);

  // Função para escolher uma imagem
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.root}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar perfil</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Foto de Perfil */}
        <View style={styles.sectionHeader}>
          <Feather name="image" size={20} color={COLORS.textDark} />
          <Text style={styles.sectionTitle}>Foto de perfil</Text>
        </View>

        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={pickImage} activeOpacity={0.8} style={styles.avatarContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Ionicons name="person-sharp" size={40} color={COLORS.bg} />
              </View>
            )}
            <View style={styles.editIconBadge}>
              <MaterialCommunityIcons name="pencil" size={14} color={COLORS.bg} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.changePhotoButton} onPress={pickImage}>
            <Text style={styles.changePhotoText}>Alterar foto</Text>
          </TouchableOpacity>
        </View>

        {/* Detalhes */}
        <View style={styles.sectionHeader}>
          <Feather name="edit-2" size={20} color={COLORS.textDark} />
          <Text style={styles.sectionTitle}>Detalhes</Text>
        </View>

        <View style={styles.inputGroup}>
          <InputLabel label="Nome" required />
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Seu nome completo"
          />
        </View>

        <View style={styles.inputGroup}>
          <InputLabel label="Email" required />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="user@exemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <InputLabel label="Número de telefone" required />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="(00) 00000-0000"
            keyboardType="phone-pad"
          />
        </View>

        {/* Senha */}
        <View style={styles.sectionHeader}>
          <Feather name="key" size={20} color={COLORS.textDark} />
          <Text style={styles.sectionTitle}>Senha</Text>
        </View>

        <Link href="/(protegida)/configuracoes/alterarSenha" asChild>
          <TouchableOpacity style={styles.outlineButton}>
            <Text style={styles.outlineButtonText}>Alterar senha</Text>
          </TouchableOpacity>
        </Link>

        {/* Localização */}
        <View style={styles.sectionHeader}>
          <Ionicons name="location-outline" size={20} color={COLORS.textDark} />
          <Text style={styles.sectionTitle}>Localização</Text>
        </View>

        <View style={styles.inputGroup}>
          <InputLabel label="Cidade" required />
          <View style={styles.dropdownInput}>
            <TextInput
              style={styles.dropdownTextInput}
              value={city}
              onChangeText={setCity}
              placeholder="Ex: Salvador – BA"
            />
            <Ionicons name="chevron-down" size={18} color={COLORS.textLight} />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <InputLabel label="CEP" required />
          <TextInput
            style={styles.input}
            value={cep}
            onChangeText={setCep}
            placeholder="Ex: 00000-000"
            keyboardType="numeric"
          />
        </View>

        {/* Botão de Enviar */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Enviar instruções</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50, // Espaço para a barra de status
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  backText: { color: COLORS.primary, fontSize: 16 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: COLORS.textDark, marginRight: 60 },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },

  // Sections
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 30, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textDark },

  // Avatar
  avatarSection: { alignItems: 'center', gap: 15, marginBottom: 20 },
  avatarContainer: { position: 'relative' },
  avatar: { width: 120, height: 120, borderRadius: 60, borderColor: COLORS.border, borderWidth: 2 },
  avatarPlaceholder: { backgroundColor: '#D6893B', justifyContent: 'center', alignItems: 'center' },
  editIconBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: COLORS.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.bg,
  },
  changePhotoButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
  },
  changePhotoText: { color: COLORS.bg, fontWeight: 'bold', fontSize: 16 },

  // Inputs
  inputGroup: { marginBottom: 20 },
  labelContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  requiredAsterisk: { color: COLORS.required, fontSize: 14, marginRight: 2 },
  inputLabel: { fontSize: 14, fontWeight: '500', color: COLORS.textDark },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.textDark,
  },

  // Dropdown City
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  dropdownTextInput: { flex: 1, fontSize: 16, color: COLORS.textDark },

  // Buttons
  outlineButton: {
    borderWidth: 1,
    borderColor: COLORS.textLight,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 25,
  },
  outlineButtonText: { color: COLORS.textDark, fontSize: 16, fontWeight: '500' },

  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  submitButtonText: { color: COLORS.bg, fontSize: 18, fontWeight: 'bold' },
});