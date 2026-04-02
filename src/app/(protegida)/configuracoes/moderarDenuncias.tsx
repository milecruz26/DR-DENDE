// src/app/(protegida)/configuracoes/moderarDenuncias.tsx
import { ReadMoreModal } from '@/components/Modal/ModalVerbete';
import { useDeleteComplaint } from '@/hooks/useStaff';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Cores do sistema
const COLORS = {
  primary: '#34523B',
  bg: '#FFFBE6',
  textDark: '#333',
  textLight: '#666',
  border: '#DDD',
  danger: '#C0392B',
};

// Interface para os dados da denúncia
interface Denuncia {
  id: string;
  estabelecimento: string;
  usuario: string;
  email: string;
  descricao: string;
  imagemEstabelecimento: string; // URL da imagem
  logoEstabelecimento: any;      // Require da logo
}

const DATA_INICIAL: Denuncia[] = [
  {
    id: '1',
    estabelecimento: 'Barraca da Cíntia',
    usuario: 'Carla santana',
    email: 'user@email.com.br',
    descricao: 'Estabelecimento está com fotos suspeitas',
    imagemEstabelecimento: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500',
    logoEstabelecimento: require('../../../../assets/images/logos/pnab-logo.png'), // Exemplo
  },
  { id: '2', estabelecimento: 'Restaurante do Zé', usuario: 'João Silva', email: 'joao@email.com', descricao: 'Preços abusivos', imagemEstabelecimento: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500', logoEstabelecimento: require('../../../../assets/images/logos/pnab-logo.png') },
  { id: '3', estabelecimento: 'Cantina da Amanda', usuario: 'Maria Souza', email: 'maria@email.com', descricao: 'Ambiente insalubre', imagemEstabelecimento: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500', logoEstabelecimento: require('../../../../assets/images/logos/pnab-logo.png') },
];

export default function ModerarDenuncias() {
  const router = useRouter();
  const [denuncias, setDenuncias] = useState<Denuncia[]>(DATA_INICIAL);
  const [searchText, setSearchText] = useState('');
  const { mutateAsync: deleteComplaint } = useDeleteComplaint();

  // Estados para os Modais
  const [selectedDenuncia, setSelectedDenuncia] = useState<Denuncia | null>(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleOpenDetails = (item: Denuncia) => {
    setSelectedDenuncia(item);
    setDetailsVisible(true);
  };

  const handleExcluirPress = () => {
    setDetailsVisible(false);
    setConfirmVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedDenuncia) return;

    try {
      await deleteComplaint(selectedDenuncia.id);

      // remove da lista local (melhora UX imediata)
      setDenuncias(prev =>
        prev.filter(d => d.id !== selectedDenuncia.id)
      );

    } catch (error) {
      console.log('Erro ao deletar denúncia:', error);
    }

    setConfirmVisible(false);
    setSelectedDenuncia(null);
  };

  const renderItem = ({ item }: { item: Denuncia }) => (
    <View style={styles.listItem}>
      <View style={styles.listItemLeft}>
        <MaterialCommunityIcons name="shield-alert-outline" size={20} color={COLORS.textDark} />
        <Text style={styles.listItemText}>{item.estabelecimento}</Text>
      </View>
      <TouchableOpacity
        style={styles.visualizarBtn}
        onPress={() => handleOpenDetails(item)}
      >
        <Text style={styles.visualizarBtnText}>Visualizar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backBtnText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Moderar denúncias</Text>
      </View>

      {/* Busca */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar nome"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchIconBtn}>
          <Feather name="search" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Lista */}
      <FlatList
        data={denuncias.filter(d => d.estabelecimento.toLowerCase().includes(searchText.toLowerCase()))}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      {/* MODAL 1: Detalhes da Denúncia */}
      <ReadMoreModal
        visible={detailsVisible}
        onClose={() => setDetailsVisible(false)}
        title="Visualizar denúncia"
        type="medium"
      >
        {selectedDenuncia ? (
          <View style={styles.modalContent}>
            {/* Seção Usuário */}
            <Text style={styles.modalSectionTitle}>Usuário</Text>
            <View style={styles.userRow}>
              <View style={styles.avatarPlaceholder}>
                <Feather name="user" size={30} color="#FFF" />
              </View>
              <View>
                <Text style={styles.userName}>{selectedDenuncia.usuario}</Text>
                <Text style={styles.userEmail}>{selectedDenuncia.email}</Text>
              </View>
            </View>

            {/* Seção Estabelecimento */}
            <Text style={styles.modalSectionTitle}>Estabelecimento</Text>
            <View style={styles.estCard}>
              <Image source={{ uri: selectedDenuncia.imagemEstabelecimento }} style={styles.estImage} />
              <View style={styles.logoBadge}>
                <Image source={selectedDenuncia.logoEstabelecimento} style={styles.logoImg} resizeMode="contain" />
              </View>
              <Text style={styles.estName}>{selectedDenuncia.estabelecimento}</Text>
            </View>

            {/* Seção Texto da Denúncia */}
            <Text style={styles.modalSectionTitle}>Denúncia</Text>
            <Text style={styles.denunciaDesc}>{selectedDenuncia.descricao}</Text>

            {/* Botões */}
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.btnOutline} onPress={() => setDetailsVisible(false)}>
                <Text style={styles.btnOutlineText}>Ignorar denúncia</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnDangerOutline} onPress={handleExcluirPress}>
                <Text style={styles.btnDangerText}>Excluir estabelecimento</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : <View />}
      </ReadMoreModal>

      {/* MODAL 2: Confirmação de Exclusão */}
      <ReadMoreModal
        visible={confirmVisible}
        onClose={() => setConfirmVisible(false)}
        title="Excluir estabelecimento"
        type="small"
      >
        <View style={styles.modalContent}>
          <Text style={styles.confirmTitle}>Você tem certeza que deseja excluir?</Text>
          <Text style={styles.confirmSub}>
            Ao excluir o estabelecimento você não poderá recuperar o cadastramento
          </Text>

          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.btnOutline} onPress={() => setConfirmVisible(false)}>
              <Text style={styles.btnOutlineText}>Ignorar denúncia</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnDangerOutline} onPress={handleConfirmDelete}>
              <Text style={styles.btnDangerText}>Excluir estabelecimento</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ReadMoreModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 20 },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  backBtnText: { color: COLORS.primary, fontSize: 16 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: COLORS.textDark, marginRight: 60 },

  searchContainer: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginBottom: 20 },
  searchInput: { flex: 1, height: 50, borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, paddingHorizontal: 15, backgroundColor: '#FFF' },
  searchIconBtn: { width: 50, height: 50, backgroundColor: COLORS.primary, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },

  listContent: { paddingHorizontal: 20 },
  listItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  listItemLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  listItemText: { fontSize: 16, color: COLORS.textDark, fontWeight: '500' },
  visualizarBtn: { borderWidth: 1, borderColor: COLORS.primary, borderRadius: 8, paddingHorizontal: 15, paddingVertical: 8 },
  visualizarBtnText: { color: COLORS.primary, fontWeight: '500' },

  // Estilos dentro dos Modais
  modalContent: { gap: 15 },
  modalSectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textDark, marginTop: 10 },
  userRow: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  avatarPlaceholder: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#E67E22', justifyContent: 'center', alignItems: 'center' },
  userName: { fontSize: 16, fontWeight: 'bold', color: COLORS.textDark },
  userEmail: { fontSize: 14, color: COLORS.textLight },

  estCard: { gap: 10 },
  estImage: { width: '100%', height: 120, borderRadius: 12 },
  logoBadge: { position: 'absolute', top: 80, left: 10, width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFF', padding: 5, elevation: 3 },
  logoImg: { width: '100%', height: '100%' },
  estName: { fontSize: 16, fontWeight: 'bold', color: COLORS.textDark, marginTop: 25 },

  denunciaDesc: { fontSize: 15, color: COLORS.textLight, lineHeight: 22 },

  modalActions: { flexDirection: 'row', gap: 10, marginTop: 20 },
  btnOutline: { flex: 1, borderWidth: 1, borderColor: COLORS.primary, borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
  btnOutlineText: { color: COLORS.primary, fontWeight: 'bold' },
  btnDangerOutline: { flex: 1, borderWidth: 1, borderColor: COLORS.danger, borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
  btnDangerText: { color: COLORS.danger, fontWeight: 'bold' },

  confirmTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.danger, textAlign: 'center' },
  confirmSub: { fontSize: 14, color: COLORS.textLight, textAlign: 'center', marginTop: 5 }
});