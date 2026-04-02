import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const COLORS = {
  primary: '#34523B',
  bg: '#FFF',
  textDark: '#333',
  textLight: '#666',
  border: '#DDD',
  disabled: '#A0A0A0',
  disabledBg: '#F5F5F5',
};

// Interface tipando os dados do cliente e o status do cupom
interface CupomSolicitado {
  id: string;
  nomeCliente: string;
  utilizado: boolean;
}

const DADOS_INICIAIS: CupomSolicitado[] = [
  { id: '1', nomeCliente: 'Ian Almeida Souza', utilizado: false },
  { id: '2', nomeCliente: 'Virginia Santos', utilizado: false },
  { id: '3', nomeCliente: 'Virginia Santos', utilizado: false },
];

export default function CuponsSolicitados() {
  const router = useRouter();
  const [cupons, setCupons] = useState<CupomSolicitado[]>(DADOS_INICIAIS);
  const [searchText, setSearchText] = useState('');

  // Função para marcar o cupom como utilizado
  const handleUtilizar = (id: string) => {
    setCupons((estadoAnterior) =>
      estadoAnterior.map((cupom) => (cupom.id === id ? { ...cupom, utilizado: true } : cupom)),
    );
  };

  const renderItem = ({ item }: { item: CupomSolicitado }) => (
    <View style={styles.listItem}>
      <View style={styles.listItemLeft}>
        <Feather name="tag" size={18} color={COLORS.textDark} />
        <Text style={styles.listItemText}>{item.nomeCliente}</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.btnUtilizar,
          item.utilizado && styles.btnUtilizado, // Aplica estilo visual de desativado se for true
        ]}
        onPress={() => handleUtilizar(item.id)}
        disabled={item.utilizado} // Bloqueia novos cliques
      >
        <Text style={[styles.btnUtilizarText, item.utilizado && styles.btnUtilizadoText]}>
          {item.utilizado ? 'Utilizado' : 'Utilizar'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Filtra os dados caso o usuário digite algo na barra de pesquisa
  const dadosFiltrados = cupons.filter((c) =>
    c.nomeCliente.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backBtnText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Descontos solicitados</Text>
      </View>

      {/* Barra de Pesquisa */}
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

      {/* Lista de Cupons */}
      <FlatList
        data={dadosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  backBtnText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginRight: 60,
  },

  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  searchIconBtn: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Espaço para não ficar colado na BottomTab se existir
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  listItemText: {
    fontSize: 16,
    color: COLORS.textDark,
    fontWeight: '400',
  },

  btnUtilizar: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 90,
    alignItems: 'center',
  },
  btnUtilizarText: {
    color: COLORS.primary,
    fontWeight: '500',
    fontSize: 14,
  },

  // Estilos para quando o botão estiver desativado (utilizado)
  btnUtilizado: {
    borderColor: COLORS.disabled,
    backgroundColor: COLORS.disabledBg,
  },
  btnUtilizadoText: {
    color: COLORS.disabled,
  },
});
