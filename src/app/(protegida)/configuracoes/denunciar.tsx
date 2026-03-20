import { MaterialCommunityIcons } from '@expo/vector-icons';
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
  bg: '#FFFBE6',
  textDark: '#444',
  textLight: '#999',
  border: '#DDD',
  required: '#E74C3C',
  danger: '#B02132', // Vermelho do botão de denúncia
};

export default function Denunciar() {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const maxLength = 120;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.root}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Título Principal */}
        <Text style={styles.mainTitle}>Denúnciar estabelecimento</Text>

        {/* Seção do Ícone e Subtítulo */}
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="shield-alert-outline" size={24} color={COLORS.textDark} />
          <Text style={styles.sectionTitle}>Texto de estabelecimento</Text>
        </View>

        {/* Input de Denúncia */}
        <View style={styles.inputContainer}>
          <View style={styles.labelRow}>
            <Text style={styles.asterisk}>*</Text>
            <Text style={styles.label}>Texto descritivo da deúncia</Text>
          </View>

          <View style={styles.textAreaWrapper}>
            <TextInput
              style={styles.textArea}
              placeholder="Descreva aqui o motivo da denúncia"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              maxLength={maxLength}
              value={description}
              onChangeText={setDescription}
            />
            <View style={styles.counterRow}>
              <Text style={styles.counterText}>{description.length}/{maxLength}</Text>
              <MaterialCommunityIcons name="pencil-outline" size={16} color={COLORS.textLight} />
            </View>
          </View>
        </View>

        {/* Botões de Ação */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => router.push('/configuracoes/confirmacaoDenuncia')}
          >
            <Text style={styles.submitButtonText}>Registrar denúncia</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  container: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 40 },

  mainTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 30 },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textDark },

  inputContainer: { marginBottom: 30 },
  labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  asterisk: { color: COLORS.required, marginRight: 4, fontWeight: 'bold' },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.textDark },

  textAreaWrapper: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 15,
    minHeight: 120,
  },
  textArea: { fontSize: 16, color: COLORS.textDark, flex: 1 },

  counterRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 5,
    marginTop: 5
  },
  counterText: { fontSize: 12, color: COLORS.textLight },

  buttonRow: { flexDirection: 'row', gap: 15 },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center'
  },
  cancelButtonText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 16 },

  submitButton: {
    flex: 2,
    backgroundColor: COLORS.danger,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center'
  },
  submitButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});