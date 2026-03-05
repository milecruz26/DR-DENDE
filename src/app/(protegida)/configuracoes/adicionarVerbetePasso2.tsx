import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// (Mantenha o objeto COLORS igual à tela 1)
const COLORS = { primary: '#34523B', white: '#FFFFFF', textDark: '#333333', textLight: '#666666', border: '#CCCCCC', danger: '#D32F2F', uploadBg: '#FAFAFA', placeholder: '#888888', };

export default function AdicionarVerbetePasso2() {
  const router = useRouter();
  // Estado para armazenar os blocos de ingredientes dinâmicos
  const [ingredientes, setIngredientes] = useState<{ id: number; imageUri: string | null }[]>([{ id: 1, imageUri: null }]);

  const adicionarIngrediente = () => {
    setIngredientes([...ingredientes, { id: Date.now(), imageUri: null }]);
  };

  const pickImage = async (index: number) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const novosIngredientes = [...ingredientes];
      novosIngredientes[index].imageUri = result.assets[0].uri;
      setIngredientes(novosIngredientes);
    }
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

        {ingredientes.map((item, index) => (
          <View key={item.id} style={styles.dynamicBlock}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="chef-hat" size={24} color={COLORS.textDark} />
              <Text style={styles.sectionTitle}>Preparo</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}><Text style={styles.required}>*</Text> Ingrediente</Text>
              <TouchableOpacity style={styles.selectInput}>
                <Text style={styles.selectText}>Selecionar</Text>
                <Feather name="chevron-down" size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}><Text style={styles.required}>*</Text> Foto representativa</Text>
              <TouchableOpacity
                style={[styles.uploadArea, item.imageUri && { borderColor: COLORS.primary }]}
                onPress={() => pickImage(index)}
              >
                {item.imageUri ? (
                  <Text style={{ color: COLORS.primary }}>Foto do ingrediente adicionada! ✓</Text>
                ) : (
                  <>
                    <Feather name="upload" size={20} color={COLORS.textLight} />
                    <Text style={styles.uploadText}>Clique para selecionar uma imagem</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Botão de Adicionar Novo sempre embaixo de cada bloco no protótipo */}
            <TouchableOpacity style={styles.addBtn} onPress={adicionarIngrediente}>
              <Feather name="plus" size={20} color={COLORS.primary} />
              <Text style={styles.addBtnText}>Adicionar novo</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Botões do Rodapé Duplos */}
        <View style={styles.footerButtons}>
          <TouchableOpacity style={styles.btnOutline} onPress={() => router.push('/configuracoes/adicionarVerbetePasso3')}>
            <Text style={styles.btnOutlineText}>Pular</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSolid} onPress={() => router.push('/configuracoes/adicionarVerbetePasso3')}>
            <Text style={styles.btnSolidText}>Prosseguir</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20 },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  backText: { color: COLORS.primary, fontSize: 16, fontWeight: '500' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: COLORS.textDark, marginRight: 60 },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20, marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textDark },

  dynamicBlock: { marginBottom: 10 },

  inputGroup: { marginBottom: 18 },
  label: { fontSize: 14, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 8 },
  required: { color: COLORS.danger },

  input: { height: 55, borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, paddingHorizontal: 15, fontSize: 16, color: COLORS.textDark, backgroundColor: COLORS.white },

  selectInput: { height: 55, borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.white },
  selectText: { fontSize: 16, color: COLORS.textLight },

  uploadArea: { height: 55, borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, backgroundColor: COLORS.uploadBg, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  uploadText: { fontSize: 14, color: COLORS.textLight },

  textAreaContainer: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, backgroundColor: COLORS.white, padding: 15, height: 120 },
  textArea: { flex: 1, fontSize: 16, color: COLORS.textDark },
  textAreaFooter: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 5, marginTop: 5 },
  charCount: { fontSize: 12, color: COLORS.placeholder },

  addBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 15, marginBottom: 10 },
  addBtnText: { color: COLORS.primary, fontSize: 16, fontWeight: '500' },

  btnPrimary: { backgroundColor: COLORS.primary, height: 55, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 },
  btnPrimaryText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },

  footerButtons: { flexDirection: 'row', gap: 12, marginTop: 15, marginBottom: 20 },
  btnOutline: { flex: 1, height: 55, borderWidth: 1, borderColor: COLORS.primary, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  btnOutlineText: { color: COLORS.primary, fontSize: 16, fontWeight: 'bold' },
  btnSolid: { flex: 1, height: 55, backgroundColor: COLORS.primary, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  btnSolidText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' }
});