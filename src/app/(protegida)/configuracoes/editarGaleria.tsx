import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const COLORS = {
  primary: '#34523B',
  bg: '#FFFBE6', // Fundo padrão do app
  textDark: '#2C2C2C',
  textLight: '#666',
  border: '#DDD',
  danger: '#B02132',
  white: '#FFFFFF'
};

export default function EditarGaleria() {
  const router = useRouter();
  const [nome, setNome] = useState('Prato feito 01');
  const [descricao, setDescricao] = useState('Arroz, feijão, farofa, salada e carne de sol');
  const [valor, setValor] = useState('R$ 00,00');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.root}
    >
      {/* Header Estilizado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Galeria do cardápio</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* Título da Seção com Ícone */}
        <View style={styles.sectionTitleRow}>
          <Feather name="edit-3" size={22} color={COLORS.textDark} />
          <Text style={styles.sectionTitle}>Editar cardápio</Text>
        </View>

        {/* Campo: Nome do Prato */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}><Text style={styles.required}>*</Text> Nome do prato</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />
        </View>

        {/* Campo: Upload de Foto */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}><Text style={styles.required}>*</Text> Foto do prato</Text>
          <TouchableOpacity style={styles.uploadArea}>
            <Feather name="upload" size={24} color={COLORS.textLight} />
            <Text style={styles.uploadText}>Clique para selecionar uma imagem</Text>
          </TouchableOpacity>
        </View>

        {/* Campo: Descrição */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}><Text style={styles.required}>*</Text> Descrição do prato</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={descricao}
            onChangeText={setDescricao}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Campo: Valor */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}><Text style={styles.required}>*</Text> Valor do prato</Text>
          <TextInput
            style={styles.input}
            value={valor}
            onChangeText={setValor}
            keyboardType="numeric"
          />
        </View>

        {/* Botões de Ação Final */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={() => router.back()}>
            <Text style={styles.deleteButtonText}>Excluir prato</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={() => router.back()}>
            <Text style={styles.saveButtonText}>Salvar alterações</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: COLORS.bg,
  },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  backText: { color: COLORS.primary, fontSize: 16, fontWeight: '500' },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginRight: 60
  },

  container: { paddingHorizontal: 24, paddingBottom: 40 },

  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
    marginBottom: 25
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textDark },

  inputWrapper: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 8 },
  required: { color: 'red' },

  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    height: 55,
    paddingHorizontal: 15,
    fontSize: 16,
    color: COLORS.textLight
  },
  textArea: {
    height: 100,
    paddingTop: 15,
  },

  uploadArea: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  uploadText: { color: COLORS.textLight, fontSize: 14 },

  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10
  },
  deleteButton: {
    flex: 1,
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.danger,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteButtonText: { color: COLORS.danger, fontWeight: 'bold', fontSize: 15 },

  saveButton: {
    flex: 1,
    height: 55,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  saveButtonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 15 }
});