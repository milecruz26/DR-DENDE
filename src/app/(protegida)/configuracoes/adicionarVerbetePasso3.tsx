import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSubmitEntry } from '@/hooks/useSubmitEntry';

const COLORS = {
  primary: '#34523B',
  white: '#FFFFFF',
  textDark: '#333333',
  textLight: '#666666',
  border: '#CCCCCC',
  placeholder: '#888888',
  danger: '#D32F2F',
  uploadBg: '#FAFAFA',
};

export default function AdicionarVerbetePasso3() {
  const router = useRouter();
  const [etapas, setEtapas] = useState([{ id: 1, descricao: '' }]);
  const { submit, isLoading } = useSubmitEntry();

  const adicionarEtapa = () => {
    setEtapas([...etapas, { id: Date.now(), descricao: '' }]);
  };

  const atualizarDescricao = (text: string, id: number) => {
    setEtapas(etapas.map((e) => (e.id === id ? { ...e, descricao: text } : e)));
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adicionar verbete</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {etapas.map((item) => (
          <View key={item.id} style={styles.dynamicBlock}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="chef-hat" size={24} color={COLORS.textDark} />
              <Text style={styles.sectionTitle}>Preparo</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                <Text style={styles.required}>*</Text> Etapa de preparo
              </Text>
              <TouchableOpacity style={styles.selectInput}>
                <Text style={styles.selectText}>Selecionar</Text>
                <Feather name="chevron-down" size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                <Text style={styles.required}>*</Text> Descrição
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Descrição do preparo"
                placeholderTextColor={COLORS.placeholder}
                value={item.descricao}
                onChangeText={(text) => atualizarDescricao(text, item.id)}
              />
            </View>

            <TouchableOpacity style={styles.addBtn} onPress={adicionarEtapa}>
              <Feather name="plus" size={20} color={COLORS.primary} />
              <Text style={styles.addBtnText}>Adicionar novo</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.footerButtons}>
          <TouchableOpacity
            style={styles.btnOutline}
            onPress={() => router.navigate('/configuracoes')}
          >
            <Text style={styles.btnOutlineText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSolid} onPress={submit}>
            <Text style={styles.btnSolidText}>Concluir</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  backText: { color: COLORS.primary, fontSize: 16, fontWeight: '500' },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginRight: 60,
  },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textDark },

  dynamicBlock: { marginBottom: 10 },

  inputGroup: { marginBottom: 18 },
  label: { fontSize: 14, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 8 },
  required: { color: COLORS.danger },

  input: {
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: COLORS.textDark,
    backgroundColor: COLORS.white,
  },

  selectInput: {
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  selectText: { fontSize: 16, color: COLORS.textLight },

  uploadArea: {
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.uploadBg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  uploadText: { fontSize: 14, color: COLORS.textLight },

  textAreaContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    padding: 15,
    height: 120,
  },
  textArea: { flex: 1, fontSize: 16, color: COLORS.textDark },
  textAreaFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 5,
    marginTop: 5,
  },
  charCount: { fontSize: 12, color: COLORS.placeholder },

  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 15,
    marginBottom: 10,
  },
  addBtnText: { color: COLORS.primary, fontSize: 16, fontWeight: '500' },

  btnPrimary: {
    backgroundColor: COLORS.primary,
    height: 55,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  btnPrimaryText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },

  footerButtons: { flexDirection: 'row', gap: 12, marginTop: 15, marginBottom: 20 },
  btnOutline: {
    flex: 1,
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnOutlineText: { color: COLORS.primary, fontSize: 16, fontWeight: 'bold' },
  btnSolid: {
    flex: 1,
    height: 55,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSolidText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
});
