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
  white: '#FFFFFF',
  textDark: '#333333',
  textLight: '#666666',
  border: '#CCCCCC',
  placeholder: '#888888',
  danger: '#D32F2F'
};

export default function AdicionarEvento() {
  const router = useRouter();

  // Estados do formulário
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.root}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adicionar Evento</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Seção: Detalhes */}
        <View style={styles.sectionHeader}>
          <Feather name="calendar" size={20} color={COLORS.textDark} />
          <Text style={styles.sectionTitle}>Detalhes</Text>
        </View>

        {/* Campo: Nome */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}><Text style={styles.required}>*</Text> Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Feijoada"
            placeholderTextColor={COLORS.placeholder}
            value={nome}
            onChangeText={setNome}
          />
        </View>

        {/* Campo: Data (Simulando um Dropdown/Seletor) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}><Text style={styles.required}>*</Text> Data</Text>
          <TouchableOpacity style={styles.selectInput}>
            <Text style={styles.selectText}>01/12/2025</Text>
            <Feather name="chevron-down" size={20} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        {/* Campo: Descrição */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}><Text style={styles.required}>*</Text> Descrição do evento</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Descrição do prato"
              placeholderTextColor={COLORS.placeholder}
              value={descricao}
              onChangeText={setDescricao}
              multiline
              maxLength={120}
              textAlignVertical="top"
            />
            <View style={styles.textAreaFooter}>
              <Text style={styles.charCount}>{descricao.length}/120</Text>
              {/* Ícone decorativo simulando o redimensionamento do text area */}
              <Feather name="menu" size={12} color={COLORS.placeholder} style={{ transform: [{ rotate: '45deg' }] }} />
            </View>
          </View>
        </View>

        {/* Seção: Localização */}
        <View style={[styles.sectionHeader, { marginTop: 10 }]}>
          <Feather name="calendar" size={20} color={COLORS.textDark} />
          <Text style={styles.sectionTitle}>Localização</Text>
        </View>

        {/* Campo: Cidade (Simulando um Dropdown/Seletor) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}><Text style={styles.required}>*</Text> Cidade</Text>
          <TouchableOpacity style={styles.selectInput}>
            <Text style={styles.selectText}>Ex: Salvador – BA</Text>
            <Feather name="chevron-down" size={20} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        {/* Campo: CEP */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}><Text style={styles.required}>*</Text> CEP</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 00000-000"
            placeholderTextColor={COLORS.placeholder}
            keyboardType="numeric"
            value={cep}
            onChangeText={setCep}
          />
        </View>

        {/* Campo: Rua */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}><Text style={styles.required}>*</Text> Rua</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Rua das Mangueiras, nº 1287"
            placeholderTextColor={COLORS.placeholder}
            value={rua}
            onChangeText={setRua}
          />
        </View>

        {/* Campo: Bairro */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}><Text style={styles.required}>*</Text> Bairro</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Bairro Rio Vermelho, Salvador"
            placeholderTextColor={COLORS.placeholder}
            value={bairro}
            onChangeText={setBairro}
          />
        </View>

        {/* Botão Adicionar Evento */}
        <TouchableOpacity style={styles.btnPrimary} onPress={() => router.back()}>
          <Text style={styles.btnPrimaryText}>Adicionar evento</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  backText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '500'
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginRight: 60 // Para centralizar o texto compensando o botão de voltar
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100 // Espaço extra para não ficar colado na Bottom Tab Bar
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
    marginTop: 10
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark
  },

  inputGroup: {
    marginBottom: 18
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 8
  },
  required: {
    color: COLORS.danger
  },

  input: {
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: COLORS.textDark,
    backgroundColor: COLORS.white
  },

  // Estilo para Selects (Data e Cidade)
  selectInput: {
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white
  },
  selectText: {
    fontSize: 16,
    color: COLORS.textLight
  },

  // Estilo específico para a Text Area de Descrição
  textAreaContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    padding: 15,
    height: 120,
  },
  textArea: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textDark,
  },
  textAreaFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 5,
    marginTop: 5
  },
  charCount: {
    fontSize: 12,
    color: COLORS.placeholder
  },

  btnPrimary: {
    backgroundColor: COLORS.primary,
    height: 55,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  btnPrimaryText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
});