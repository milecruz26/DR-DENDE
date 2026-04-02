import { Feather, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageUploadField from '@/components/ImageUploadField';
import { useCreateDish } from '@/hooks/useEstablishment';

// Keep COLORS same as step 1
const COLORS = {
  primary: '#34523B',
  white: '#FFFFFF',
  textDark: '#333333',
  textLight: '#666666',
  border: '#CCCCCC',
  danger: '#D32F2F',
  uploadBg: '#FAFAFA',
  placeholder: '#888888',
};

type MenuItem = {
  id: number;
  nome: string;
  ingrediente: string | null;
  imageUri: string | null;
};
type Verbete = {
  id: string;
  name: string;
};
const PRATOS_VERBETES: Verbete[] = [
  { id: 'abara', name: 'Abará' },
  { id: 'acaca', name: 'Acaçá' },
  { id: 'acaraje', name: 'Acarajé' },
  { id: 'arrozDeHauca', name: 'Arroz de hauçá' },
  { id: 'mocoto', name: 'Mocotó' },
  { id: 'passarinha', name: 'Passarinha' },
  { id: 'vatapa', name: 'Vatapá' },
  { id: 'caruru', name: 'Caruru' },
  { id: 'frigideira', name: 'Frigideira' },
  { id: 'feijaoDeAzeite', name: 'Feijão de Azeite' },
  { id: 'manicoba', name: 'Maniçoba' },
  { id: 'moqueca', name: 'Moqueca' },
  { id: 'mugunza', name: 'Mungunzá' },
  { id: 'sarapatel', name: 'Sarapatel' },
  { id: 'xinxin', name: 'Xinxim' },
  { id: 'punheta', name: 'Bolinho de estudante / "punheta"' },
  { id: 'cocada', name: 'Cocada' },
  { id: 'efo', name: 'Efó' },
  { id: 'feijaoDeLeite', name: 'Feijão de Leite' },
  { id: 'feijoada', name: 'Feijoada' },
  { id: 'galinhaMolhoPardo', name: 'Galinha de molho pardo' },
  { id: 'balaDeVidro', name: 'Bala Baiana ou Bala de Vidro' },
  { id: 'cozido', name: 'Cozido' },
  { id: 'dobradinha', name: 'Dobradinha' },
  { id: 'mininicoDeCarneiro', name: 'Meninico de Carneiro' },
  { id: 'quiabada', name: 'Quiabada' },
  { id: 'rabada', name: 'Rabada' },
  { id: 'boboDeCamarao', name: 'Bobó de Camarão' },
  { id: 'cuscuze', name: 'Cuscuz' },
  { id: 'fumeiro', name: 'Carne de Fumeiro' },
  { id: 'malassado', name: 'Malassado' },
];
export default function EditarGaleria() {
  const router = useRouter();
  const createDishMutation = useCreateDish();
  // Dynamic ingredient blocks state
  const [items, setItems] = useState<MenuItem[]>([
    { id: 1, nome: '', ingrediente: null, imageUri: null },
  ]);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    // Filtrar apenas itens com nome, ingrediente e imagem preenchidos
    const validItems = items.filter(
      (item): item is Required<MenuItem> =>
        !!item.nome.trim() && !!item.ingrediente && !!item.imageUri,
    ); // Agora TypeScript sabe que ingrediente e imageUri não são null

    if (validItems.length === 0) {
      alert('Preencha pelo menos um prato com nome, verbete e imagem.');
      return;
    }

    setLoading(true);
    let success = true;
    for (const item of validItems) {
      const formData = new FormData();
      formData.append('name', item.nome);
      formData.append('associated_entry', item.ingrediente!);
      const filename = item.imageUri!.split('/').pop() ?? `image-${Date.now()}.jpg`;
      const match = /\.(\w+)$/.exec(filename ?? '');
      const type = match ? `image/${match[1]}` : 'image/jpeg';
      formData.append('dish_image_path', {
        uri: item.imageUri,
        name: filename || 'image.jpg',
        type,
      } as unknown as Blob);

      try {
        await createDishMutation.mutateAsync(formData);
      } catch (err) {
        console.error(err);
        success = false;
        alert(`Erro ao salvar "${item.nome}". Tente novamente.`);
        break;
      }
    }

    setLoading(false);
    if (success) {
      alert('Prato(s) cadastrado(s) com sucesso!');
      router.back();
    }
  };

  const addItem = () => {
    setItems((prev) => [...prev, { id: Date.now(), nome: '', ingrediente: null, imageUri: null }]);
  };

  const updateItem = <K extends keyof MenuItem>(index: number, field: K, value: MenuItem[K]) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const selectVerbete = (index: number, selectedId: string) => {
    updateItem(index, 'ingrediente', selectedId);
    setModalIndex(null);
    setSearch('');
  };

  const normalize = (str: string): string =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  const filteredPratosVerbetes = PRATOS_VERBETES.filter((item) =>
    normalize(item.name).includes(normalize(search)),
  );
  const pickImage = async (index: number) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      updateItem(index, 'imageUri', result.assets[0].uri);
    }
  };

  const removeImage = (index: number) => {
    updateItem(index, 'imageUri', null);
  };

  const removeItem = (index: number) => {
    if (items.length === 1) return; // evita apagar o último
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar galeria</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {items.map((item, index) => {
          const selectedVerbeteName =
            PRATOS_VERBETES.find((v) => v.id === item.ingrediente)?.name || 'Selecionar';
          return (
            <View key={item.id} style={styles.dynamicBlock}>
              {/* HEADER */}
              <View style={styles.blockHeader}>
                <View style={styles.blockTitleContainer}>
                  <Image
                    source={require('@/assets/images/icones/plate.png')}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text style={styles.blockTitle}>Prato da galeria</Text>
                </View>

                {items.length > 1 && (
                  <TouchableOpacity onPress={() => removeItem(index)}>
                    <Feather name="trash-2" size={18} color={COLORS.danger} />
                  </TouchableOpacity>
                )}
              </View>

              {/* INPUTS */}
              <View style={styles.row}>
                <View style={styles.half}>
                  <Text style={styles.label}>
                    <Text style={styles.required}>*</Text> Nome do prato
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Quiabada"
                    value={item.nome}
                    onChangeText={(text) => updateItem(index, 'nome', text)}
                  />
                </View>

                <View style={styles.half}>
                  <Text style={styles.label}>
                    <Text style={styles.required}>*</Text> Prato do verbete
                  </Text>
                  <TouchableOpacity style={styles.selectInput} onPress={() => setModalIndex(index)}>
                    <Text
                      style={[styles.selectText, item.ingrediente && { color: COLORS.textDark }]}
                    >
                      {selectedVerbeteName}
                    </Text>
                    <Feather name="chevron-down" size={20} color={COLORS.textLight} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* IMAGEM */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  <Text style={styles.required}>*</Text> Foto representativa
                </Text>

                <ImageUploadField
                  imageUri={item.imageUri}
                  onPickImage={() => pickImage(index)}
                  onRemoveImage={() => removeImage(index)}
                />
              </View>

              {/* ADD NOVO */}
              <TouchableOpacity style={styles.addBtn} onPress={addItem}>
                <Feather name="plus" size={18} color={COLORS.primary} />
                <Text style={styles.addBtnText}>Adicionar novo</Text>
              </TouchableOpacity>

              {/* DIVIDER */}
              {index !== items.length - 1 && <View style={styles.divider} />}
            </View>
          );
        })}

        {/* Footer buttons */}
        <View style={styles.footerButtons}>
          {/* <TouchableOpacity style={styles.btnOutline} onPress={() => router.push('/configuracoes/adicionarVerbetePasso3')}>
            <Text style={styles.btnOutlineText}>Pular</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.btnSolid} onPress={handleSave} disabled={loading}>
            <Text style={styles.btnSolidText}>{loading ? 'Salvando...' : 'Salvar alterações'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Ingredient selection modal */}
      <Modal visible={modalIndex !== null} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => {
              setModalIndex(null);
              setSearch('');
            }}
          />
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
              data={filteredPratosVerbetes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => modalIndex !== null && selectVerbete(modalIndex, item.id)}
                >
                  <Text style={styles.modalOptionText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
  },

  half: {
    flex: 1,
  },
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

  inputGroup: { marginVertical: 18 },
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

  deleteBtn: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.danger,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

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
    gap: 6,
    paddingVertical: 12,
  },

  addBtnText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '500',
  },

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

  // Ingredient modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    maxHeight: '70%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  modalSearch: {
    height: 45,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 10,
  },
  modalList: { maxHeight: 350 },
  modalOption: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  modalOptionText: { fontSize: 16, color: COLORS.textDark, textAlign: 'center' },
  modalEmpty: { alignItems: 'center', paddingVertical: 20, gap: 12 },
  modalEmptyText: { textAlign: 'center', color: COLORS.placeholder, fontSize: 14 },
  modalAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalAddBtnText: { color: COLORS.white, fontSize: 14, fontWeight: '500' },
  blockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  blockTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  blockTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginTop: 15,
  },
});
