import { Header } from '@/components/Header';
import { EstabelecimentoDetalhes } from '@/components/Modal/EstabelecimentoDetalhes';
import { ReadMoreModal } from '@/components/Modal/ModalVerbete';
import { RestaurantCardSearch } from '@/components/Restaurante/RestauranteCardSearch';
import { VerbeteCardSearch } from '@/components/Verbete/VerbeteCardSearch';
import Colors from '@/theme/Colors';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const { NEUTRAL, primary, SECONDARY } = Colors

// Tipagem dos dados mockados
interface Favorito {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
}

const DADOS_MOCKADOS: Favorito[] = [
  {
    id: '1',
    titulo: 'FEIJOADA',
    descricao: 'Lorem ipsum dollor Lorem ipsum dollor Lorem ipsum',
    imagem: 'https://cdn-icons-png.flaticon.com/512/3448/3448066.png', // Usando um ícone genérico como placeholder
  },
  {
    id: '2',
    titulo: 'FEIJOADA',
    descricao: 'Lorem ipsum dollor Lorem ipsum dollor Lorem ipsum',
    imagem: 'https://cdn-icons-png.flaticon.com/512/3448/3448066.png',
  },
  {
    id: '3',
    titulo: 'FEIJOADA',
    descricao: 'Lorem ipsum dollor Lorem ipsum dollor Lorem ipsum',
    imagem: 'https://cdn-icons-png.flaticon.com/512/3448/3448066.png',
  },
  {
    id: '4',
    titulo: 'FEIJOADA',
    descricao: 'Lorem ipsum dollor Lorem ipsum dollor Lorem ipsum',
    imagem: 'https://cdn-icons-png.flaticon.com/512/3448/3448066.png',
  },
];

const MOCK_VERBETES = [
  { id: 1, title: 'PASSARINHA', desc: 'A passarinha, apesar de como é chamada, nada tem a ver...', bg: '#E0F0E2', img: require('../../../assets/images/pratos/feijoada.png') },
  { id: 2, title: 'FEIJOADA', desc: 'A feijoada é um prato muito popular em todo o Brasil.', bg: '#FFC84A', img: require('../../../assets/images/pratos/passarinha.png') },
];

// Mock Restaurantes
const MOCK_RESTAURANTES = [
  {
    id: 1,
    name: 'Estabelecimento lorem ipsum',
    image: require('../../../assets/images/mock/capa-1.png'),
    logo: require('../../../assets/images/mock/logo-1.png')
  },
  {
    id: 2,
    name: 'Bom Baiano',
    image: require('../../../assets/images/mock/capa-2.jpg'),
    logo: require('../../../assets/images/mock/logo-2.png')
  },
  {
    id: 3, name: 'Restaurante da Orla',
    image: require('../../../assets/images/mock/capa-3.jpg'),
    logo: require('../../../assets/images/mock/logo-3.jpg')
  },
];

type CategoryType = 'verbetes' | 'restaurantes';
export default function Favoritos() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState<'verbetes' | 'restaurantes'>('verbetes');
  const [estabelecimentoSelecionado, setEstabelecimentoSelecionado] = useState(null);
  const [activeTab, setActiveTab] = useState<CategoryType>('verbetes');

  const abrirDetalhes = (item: any) => {
    setEstabelecimentoSelecionado(item);
    setModalVisivel(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFDF4" />

      <Header />


      {/* Título */}
      <Text style={styles.pageTitle}>Meus favoritos</Text>


      <View style={styles.bottomSheet}>

        {/* Toggle Principal (Verbetes / Restaurantes) */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'verbetes' && styles.tabActive]}
            onPress={() => setActiveTab('verbetes')}
          >


            <Image
              source={activeTab === 'verbetes' ?
                require('../../../assets/images/icones/book-line-white.png') : require('../../../assets/images/icones/book-line-neutral.png')}
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
                require('../../../assets/images/icones/dinner-line-white.png') : require('../../../assets/images/icones/dinner-line-neutral.png')}
              style={{ width: 24, height: 24, marginRight: 8 }} />

            <Text style={[styles.tabText, activeTab === 'restaurantes' && styles.tabTextActive]}>Restaurantes</Text>
          </TouchableOpacity>
        </View>



        {/* Lista de Conteúdo */}
        <FlatList
          // data={MOCK_RESTAURANTES}
          data={(activeTab === 'verbetes' ? MOCK_VERBETES : MOCK_RESTAURANTES) as any[]}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => ( // <-- Pegamos o index aqui
            activeTab === 'verbetes'
              ? <VerbeteCardSearch item={item} index={index} /> // <-- Passamos o index para o card
              : <RestaurantCardSearch
                item={item as any} moreDetailsPress={() => abrirDetalhes(item)} />
          )}
          // Espaço extra embaixo para o menu não cobrir o último item
          ListFooterComponent={<View style={{ height: 100 }} />}
        />

      </View>
      <ReadMoreModal
        visible={modalVisivel}
        onClose={() => setModalVisivel(false)}
        title="Estabelecimento ipsum"
        type="full"
      >
        {/* O novo componente entra como 'children' mágico aqui dentro! */}
        <EstabelecimentoDetalhes />
      </ReadMoreModal>

      {/* Abas (Tabs) */}
      {/* <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, abaAtiva === 'verbetes' && styles.tabActive]}
          onPress={() => setAbaAtiva('verbetes')}
        >
          <Feather
            name="book-open"
            size={18}
            color={abaAtiva === 'verbetes' ? '#FFF' : '#777'}
          />
          <Text style={[styles.tabText, abaAtiva === 'verbetes' && styles.tabTextActive]}>
            Verbetes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, abaAtiva === 'restaurantes' && styles.tabActive]}
          onPress={() => setAbaAtiva('restaurantes')}
        >
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            size={18}
            color={abaAtiva === 'restaurantes' ? '#FFF' : '#777'}
          />
          <Text style={[styles.tabText, abaAtiva === 'restaurantes' && styles.tabTextActive]}>
            Restaurantes
          </Text>
        </TouchableOpacity>
      </View> */}

      {/* Lista de Favoritos */}
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      >
        {DADOS_MOCKADOS.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <Text style={styles.cardDescription}>{item.descricao}</Text>
            </View>
            <View style={styles.cardActions}>
              <TouchableOpacity>
                <FontAwesome name="bookmark" size={24} color="#4A4A4A" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons name="dots-vertical" size={24} color="#4A4A4A" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
   
        <View style={{ height: 100 }} />
      </ScrollView> */}


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF4', // Cor de fundo bege bem claro
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  profileAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E67E22', // Laranja
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
    marginHorizontal: 20,
    borderRadius: 30,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 26,
    gap: 8,
  },
  tabActive: {
    backgroundColor: primary.dark,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: NEUTRAL.darker,
  },
  tabTextActive: {
    color: '#FFF',
  },
  listContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FDEFC8', // Fundo amarelo/laranja claro
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F6D07F', // Borda amarelada
    alignItems: 'center',
    height: 80,
  },
  cardImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    fontStyle: 'italic', // Simulando a fonte estilizada do design
    color: '#333',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: '#555',
    lineHeight: 16,
  },
  cardActions: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    paddingVertical: 4,
    gap: 12,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#375A45', // Verde escuro
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  navItemCentralContainer: {
    position: 'relative',
    top: -20, // Eleva o botão central
  },
  navItemCentral: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#2A4332', // Verde um pouco mais escuro
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 24,
    overflow: 'hidden',
  },
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
  divider: {
    width: 1,
    height: '60%',
    backgroundColor: '#DDD',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});