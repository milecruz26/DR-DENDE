import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ImageUploadField from '@/components/ImageUploadField';

// Keep COLORS same as step 1
const COLORS = { primary: '#34523B', white: '#FFFFFF', textDark: '#333333', textLight: '#666666', border: '#CCCCCC', danger: '#D32F2F', uploadBg: '#FAFAFA', placeholder: '#888888', };

const INGREDIENTS_LIST = [
  'Abóbora', 'Água', 'Aipim (mandioca/macaxeira)', 'Alho', 'Alfavaquinha', 'Amendoim',
  'Arroz branco', 'Azeite (doce)', 'Azeite de dendê', 'Azeite de oliva', 'Bacon', 'Bacalhau',
  'Banana-da-terra', 'Batata-doce', 'Batata inglesa', 'Baço bovino', 'Cabeça de porco',
  'Camarão fresco', 'Camarão seco', 'Canela em pó', 'Carne (filé mignon ou alcatra)',
  'Carne bovina', 'Carne de fumeiro', 'Carneiro (vísceras)', 'Castanha de caju', 'Cebola',
  'Cebola roxa', 'Cenoura', 'Charque', 'Cheiro-verde', 'Chouriço / Paio', 'Chuchu',
  'Colorau', 'Cominho', 'Coco ralado', 'Coco seco', 'Coentro', 'Costela bovina',
  'Costela de porco defumada', 'Couve', 'Dobradinha (bucho bovino)', 'Espiga de milho',
  'Extrato de tomate', 'Farinha de mandioca', 'Farinha de milho', 'Farinha de tapioca',
  'Farinha de trigo', 'Fato de porco', 'Feijão-fradinho', 'Folha de louro',
  'Folhas de aipim', 'Folhas de bananeira', 'Folhas de língua de vaca', 'Frango', 'Galinha',
  'Gengibre', 'Hortelã', 'Jiló', 'Leite', 'Leite condensado', 'Leite de coco', 'Limão',
  'Linguiça (calabresa/toscana)', 'Manteiga', 'Manteiga de garrafa', 'Margarina', 'Maxixe',
  'Milho branco', 'Mocotó', 'Mocotó de gado bovino', 'Óleo', 'Orelha de porco', 'Ovos',
  'Pimenta', 'Pimenta malagueta', 'Pimenta-do-reino', 'Pimentão', 'Pó de arroz', 'Quiabo',
  'Rabo bovino', 'Rabo de porco', 'Repolho', 'Sal', 'Salsa', 'Sangue de galinha',
  'Sangue de porco', 'Sementes de abóbora ou melancia', 'Siri mole', 'Tomate', 'Toucinho',
  'Vinho tinto seco', 'Vinagre',
];

export default function AdicionarVerbetePasso2() {
  const router = useRouter();
  // Dynamic ingredient blocks state
  const [ingredients, setIngredients] = useState<{ id: number; name: string | null; imageUri: string | null }[]>([{ id: 1, name: null, imageUri: null }]);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const addIngredient = () => {
    setIngredients([...ingredients, { id: Date.now(), name: null, imageUri: null }]);
  };

  const selectIngredient = (index: number, name: string) => {
    const updated = [...ingredients];
    updated[index].name = name;
    setIngredients(updated);
    setModalIndex(null);
    setSearch('');
  };

  const normalize = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  const filteredIngredients = INGREDIENTS_LIST.filter((item) =>
    normalize(item).includes(normalize(search))
  );

  const removeImage = (index: number) => {
    const updated = [...ingredients];
    updated[index].imageUri = null;
    setIngredients(updated);
  };

  const pickImage = async (index: number) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const updated = [...ingredients];
      updated[index].imageUri = result.assets[0].uri;
      setIngredients(updated);
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

        {ingredients.map((item, index) => (
          <View key={item.id} style={styles.dynamicBlock}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="chef-hat" size={24} color={COLORS.textDark} />
              <Text style={styles.sectionTitle}>Preparo</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}><Text style={styles.required}>*</Text> Ingrediente</Text>
              <TouchableOpacity style={styles.selectInput} onPress={() => setModalIndex(index)}>
                <Text style={[styles.selectText, item.name && { color: COLORS.textDark }]}>
                  {item.name || 'Selecionar'}
                </Text>
                <Feather name="chevron-down" size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}><Text style={styles.required}>*</Text> Foto representativa</Text>
              <ImageUploadField
                imageUri={item.imageUri}
                onPickImage={() => pickImage(index)}
                onRemoveImage={() => removeImage(index)}
              />
            </View>

            {/* Add new ingredient button */}
            <TouchableOpacity style={styles.addBtn} onPress={addIngredient}>
              <Feather name="plus" size={20} color={COLORS.primary} />
              <Text style={styles.addBtnText}>Adicionar novo</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Footer buttons */}
        <View style={styles.footerButtons}>
          <TouchableOpacity style={styles.btnOutline} onPress={() => router.push('/configuracoes/adicionarVerbetePasso3')}>
            <Text style={styles.btnOutlineText}>Pular</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSolid} onPress={() => router.push('/configuracoes/adicionarVerbetePasso3')}>
            <Text style={styles.btnSolidText}>Prosseguir</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Ingredient selection modal */}
      <Modal visible={modalIndex !== null} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => { setModalIndex(null); setSearch(''); }} />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione um Ingrediente</Text>
            <TextInput
              style={styles.modalSearch}
              placeholder="Buscar ingrediente..."
              placeholderTextColor={COLORS.placeholder}
              value={search}
              onChangeText={setSearch}
            />
            <FlatList
              data={filteredIngredients}
              keyExtractor={(item) => item}
              style={styles.modalList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => modalIndex !== null && selectIngredient(modalIndex, item)}
                >
                  <Text style={styles.modalOptionText}>{item}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={styles.modalEmpty}>
                  <Text style={styles.modalEmptyText}>Nenhum ingrediente encontrado</Text>
                  <TouchableOpacity
                    style={styles.modalAddBtn}
                    onPress={() => {
                      if (search.trim() && modalIndex !== null) {
                        selectIngredient(modalIndex, search.trim());
                      }
                    }}
                  >
                    <Feather name="plus" size={18} color={COLORS.white} />
                    <Text style={styles.modalAddBtnText}>Adicionar "{search.trim()}"</Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        </View>
      </Modal>
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

  deleteBtn: { width: 55, height: 55, borderWidth: 1, borderColor: COLORS.danger, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },

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
  btnSolidText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },

  // Ingredient modal styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', maxHeight: '70%', backgroundColor: '#FFF', borderRadius: 12, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  modalSearch: { height: 45, borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, paddingHorizontal: 12, fontSize: 14, marginBottom: 10 },
  modalList: { maxHeight: 350 },
  modalOption: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  modalOptionText: { fontSize: 16, color: COLORS.textDark, textAlign: 'center' },
  modalEmpty: { alignItems: 'center', paddingVertical: 20, gap: 12 },
  modalEmptyText: { textAlign: 'center', color: COLORS.placeholder, fontSize: 14 },
  modalAddBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  modalAddBtnText: { color: COLORS.white, fontSize: 14, fontWeight: '500' },
});