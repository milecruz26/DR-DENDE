import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/Header';
import { EstabelecimentoDetalhes } from '@/components/Modal/EstabelecimentoDetalhes';
import { ReadMoreModal } from '@/components/Modal/ModalVerbete';
import { RestaurantCardSearch } from '@/components/Restaurante/RestauranteCardSearch';
import { VerbeteCardSearch } from '@/components/Verbete/VerbeteCardSearch';
import { useDislikeDish, useLikedDishes, useLikeDish } from '@/hooks/useDish';
import { useAllEntries } from '@/hooks/useEntries';
import { useEstablishments } from '@/hooks/useEstablishment';
import { User } from '@/interfaces';
import Colors from '@/theme/Colors';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');


const COLORS = Colors;
const { NEUTRAL, primary, SECONDARY } = COLORS

type CategoryType = 'verbetes' | 'restaurantes';

// Mock Restaurantes
const MOCK_RESTAURANTES = [
  {
    id: 1,
    name: 'Estabelecimento lorem ipsum',
    image: require('../../../../assets/images/mock/capa-1.png'),
    logo: require('../../../../assets/images/mock/logo-1.png')
  },
  {
    id: 2,
    name: 'Bom Baiano',
    image: require('../../../../assets/images/mock/capa-2.jpg'),
    logo: require('../../../../assets/images/mock/logo-2.png')
  },
  {
    id: 3, name: 'Restaurante da Orla',
    image: require('../../../../assets/images/mock/capa-3.jpg'),
    logo: require('../../../../assets/images/mock/logo-3.jpg')
  },
];




// ==========================================
// 3. Tela Principal de Busca
// ==========================================

export default function BuscaScreen() {
  const { user } = useAuth();
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  const [activeTab, setActiveTab] = useState<CategoryType>(tab === 'restaurantes' ? 'restaurantes' : 'verbetes');
  const [subTab, setSubTab] = useState<'todos' | 'cupom'>('todos');
  const [searchText, setSearchText] = useState('');
  const [estabelecimentoSelecionado, setEstabelecimentoSelecionado] = useState<User>();
  const [modalVisivel, setModalVisivel] = useState(false);
  const { data: verbetes } = useAllEntries();
  const { data: likedDishes } = useLikedDishes();
  const { mutate: like } = useLikeDish();
  const { mutate: dislike } = useDislikeDish();
  const { data: establishments = [] } = useEstablishments();

  const filteredEstablishments = establishments.filter(est => {
    if (subTab === 'cupom') {
      return est.coupon_enabled === true;
    }
    return true;
  });


  const abrirDetalhes = (item: User) => {
    setEstabelecimentoSelecionado(item);
    setModalVisivel(true);
  };

  const likedIds = likedDishes?.map(d => d.id) || [];

  const handleToggleLike = (id: string) => {
    if (likedIds.includes(id)) dislike(id);
    else like(id);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#FFFBE6'} />

      {/* --- ÁREA DO MAPA (TOPO) --- */}
      <View style={styles.mapContainer}>
        {/* Aqui virá o <MapView /> no futuro. Por enquanto, uma imagem ou cor */}
        <Image
          source={require('../../../../assets/mock/map.png')}
          style={styles.mapImage}
        />

        {/* Header Superior (Avatar e Local) */}
        <SafeAreaView style={styles.safeTop}>

          <Header />
          <View style={styles.line} />
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Comida com dendê"
              style={styles.searchInput}
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity style={styles.searchButton}>
              <Feather name="search" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* --- BOTTOM SHEET (CONTEÚDO) --- */}
      <View style={styles.bottomSheet}>

        {/* Toggle Principal (Verbetes / Restaurantes) */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'verbetes' && styles.tabActive]}
            onPress={() => setActiveTab('verbetes')}
          >
            {/* <Feather name="book-open" size={18} color={activeTab === 'verbetes' ? '#FFF' : NEUTRAL.deep} style={{ marginRight: 8 }} /> */}

            <Image
              source={activeTab === 'verbetes' ?
                require('../../../../assets/images/icones/book-line-white.png') : require('../../../../assets/images/icones/book-line-neutral.png')}
              style={{ width: 24, height: 24, marginRight: 8 }} />

            <Text style={[styles.tabText, activeTab === 'verbetes' && styles.tabTextActive]}>Verbetes</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'restaurantes' && styles.tabActive]}
            onPress={() => setActiveTab('restaurantes')}
          >
            <Image
              source={activeTab === 'restaurantes' ?
                require('../../../../assets/images/icones/dinner-line-white.png') : require('../../../../assets/images/icones/dinner-line-neutral.png')}
              style={{ width: 24, height: 24, marginRight: 8 }} />
            {/* <Feather name="coffee" size={18} color={activeTab === 'restaurantes' ? '#FFF' : NEUTRAL.deep} style={{ marginRight: 8 }} /> */}
            <Text style={[styles.tabText, activeTab === 'restaurantes' && styles.tabTextActive]}>Restaurantes</Text>
          </TouchableOpacity>
        </View>

        {/* Sub-menu (Apenas para Restaurantes) */}
        {activeTab === 'restaurantes' && (
          <View style={styles.subTabContainer}>
            <TouchableOpacity onPress={() => setSubTab('todos')} style={styles.subTabItem}>
              <Text style={[styles.subTabText, subTab === 'todos' && styles.subTabActiveText]}>Todos</Text>
              {subTab === 'todos' && <View style={styles.subTabLine} />}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSubTab('cupom')} style={styles.subTabItem}>
              <Text style={[styles.subTabText, subTab === 'cupom' && styles.subTabActiveText]}>Com cupom de desconto</Text>
              {subTab === 'cupom' && <View style={[styles.subTabLine]} />}
            </TouchableOpacity>
          </View>
        )}

        {/* Lista de Conteúdo */}
        <FlatList
          // data={MOCK_RESTAURANTES}
          data={(activeTab === 'verbetes' ? verbetes : filteredEstablishments) as any[]}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => ( // <-- Pegamos o index aqui
            activeTab === 'verbetes'
              ? <VerbeteCardSearch
                img={item.picture}
                id={item.id}
                title={item.name}
                desc={item.entry_text}
                index={index}
                isLiked={likedIds.includes(item.id)}
                onToggleLike={handleToggleLike}
                favoritosPage={false}
                showBookmark={user?.user_type === 'common'}
              />
              : <RestaurantCardSearch
                item={item} moreDetailsPress={() => abrirDetalhes(item)} />
          )}
          // Espaço extra embaixo para o menu não cobrir o último item
          ListFooterComponent={<View style={{ height: 100 }} />}
        />

      </View>
      <ReadMoreModal
        visible={modalVisivel}
        onClose={() => setModalVisivel(false)}
        title={estabelecimentoSelecionado?.username}
        type="full"
      >
        {/* O novo componente entra como 'children' mágico aqui dentro! */}
        <EstabelecimentoDetalhes establishment={estabelecimentoSelecionado as User} />
      </ReadMoreModal>
    </View>
  );
}

// ==========================================
// 4. Estilos
// ==========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFFBE6',
  },

  // --- Mapa e Header ---
  mapContainer: {
    height: 380, // Ocupa a parte superior
    width: '100%',
    position: 'absolute',
    // position: 'absolute',
    top: 0,
  },
  mapImage: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  safeTop: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 161,
    backgroundColor: "rgba(255, 255, 255, 0.90)",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,

  },
  line: {
    display: 'flex',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    marginHorizontal: 16,
    marginBottom: 16,
  },

  // Busca
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,

    // backgroundColor: 'red',
    gap: 8
  },
  searchInput: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: NEUTRAL.lighter,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 16,
    height: 50,
    fontSize: 16,
    color: NEUTRAL.darker,
    borderWidth: 1,
    borderColor: '#D1D1D1',
    borderRadius: 8
  },
  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: SECONDARY.dark,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // --- Bottom Sheet ---
  bottomSheet: {
    marginTop: 340, // Define onde começa a parte branca (ajuste conforme altura do mapa)
    flex: 1,
    backgroundColor: '#FDFDFD',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 24,
    overflow: 'hidden',
  },

  // Tabs
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: NEUTRAL.light150,
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 4,
    height: 50,
    marginBottom: 16,
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderRadius: 22,
  },
  tabActive: {
    backgroundColor: primary.dark,
  },
  tabText: {
    fontWeight: '600',
    color: NEUTRAL.darker,
  },
  tabTextActive: {
    color: '#FFF',
  },
  divider: {
    width: 1,
    height: '60%',
    backgroundColor: '#DDD',
  },

  // SubTabs (Restaurantes)
  subTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    marginBottom: 16,
  },
  subTabItem: {
    paddingBottom: 10,
    alignItems: 'center',
    flex: 1,
  },
  subTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: NEUTRAL.darker,
  },
  subTabActiveText: {
    // color: 'red',
    color: primary.dark,
  },
  subTabLine: {
    height: 3,
    width: '60%',
    backgroundColor: primary.dark,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});