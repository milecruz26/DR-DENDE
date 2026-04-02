import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const COLORS = {
  primary: '#34523B',
  bg: '#FFFBE6',
  textDark: '#333',
  border: '#DDD',
};

interface EstabelecimentoPendente {
  id: string;
  nome: string;
}

const DADOS_INICIAIS: EstabelecimentoPendente[] = [
  { id: '1', nome: 'Barraca da Cíntia' },
  { id: '2', nome: 'Restaurante do Zé' },
  { id: '3', nome: 'Cantina da Amanda' },
];

export default function ModerarEstabelecimentos() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [estabelecimentos, setEstabelecimentos] =
    useState<EstabelecimentoPendente[]>(DADOS_INICIAIS);
  const [searchText, setSearchText] = useState('');

  // Efeito para remover o item da lista caso a tela de detalhes retorne um ID aprovado
  useEffect(() => {
    if (params.idAprovado) {
      setEstabelecimentos((prev) => prev.filter((est) => est.id !== params.idAprovado));
    }
  }, [params.idAprovado]);

  const handleVisualizar = (id: string) => {
    // Navega para a tela de detalhes passando o ID
    router.push({
      pathname: '/configuracoes/detalhesEstabelecimento',
      params: { id },
    });
  };

  const handleAprovarDireto = (id: string) => {
    setEstabelecimentos((prev) => prev.filter((est) => est.id !== id));
  };

  const renderItem = ({ item }: { item: EstabelecimentoPendente }) => (
    <View style={styles.listItem}>
      <View style={styles.listItemLeft}>
        <MaterialCommunityIcons name="store-outline" size={20} color={COLORS.textDark} />
        <Text style={styles.listItemText}>{item.nome}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnVisualizar} onPress={() => handleVisualizar(item.id)}>
          <Text style={styles.btnVisualizarText}>Visualizar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnAprovar} onPress={() => handleAprovarDireto(item.id)}>
          <Feather name="check" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backBtnText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Moderar estabelecimentos</Text>
      </View>

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

      <FlatList
        data={estabelecimentos.filter((e) =>
          e.nome.toLowerCase().includes(searchText.toLowerCase()),
        )}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  backBtnText: { color: COLORS.primary, fontSize: 16 },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginRight: 60,
  },

  searchContainer: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginBottom: 20 },
  searchInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
  },
  searchIconBtn: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listContent: { paddingHorizontal: 20 },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  listItemLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  listItemText: { fontSize: 16, color: COLORS.textDark, fontWeight: '500' },

  actions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  btnVisualizar: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  btnVisualizarText: { color: COLORS.primary, fontWeight: '500' },
  btnAprovar: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
