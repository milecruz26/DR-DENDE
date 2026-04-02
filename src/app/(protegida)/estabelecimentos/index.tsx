// src/app/(protegida)/estabelecimentos/index.tsx
import { Header } from "@/components/Header";
import { EstabelecimentoDetalhes } from "@/components/Modal/EstabelecimentoDetalhes";
import VerbetesExcludConfirm from "@/components/Modal/ExcludConfirm/VerbetesExcludConfirm";
import { ReadMoreModal } from "@/components/Modal/ModalVerbete";
import { RestaurantCardSearch } from "@/components/Restaurante/RestauranteCardSearch";
import { useEstablishments } from '@/hooks/useEstablishment';
import { User } from "@/interfaces";
import Colors from "@/theme/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { FlatList, ImageSourcePropType, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface RestaurantCardProps {

  id: number;
  name: string;
  image: ImageSourcePropType;
  logo: ImageSourcePropType;


}


const { NEUTRAL, primary } = Colors

const MOCK_RESTAURANTES = [
  {
    id: "1",
    name: 'Estabelecimento lorem ipsum',
    image: require('../../../../assets/images/mock/capa-1.png'),
    logo: require('../../../../assets/images/mock/logo-1.png')
  },
  {
    id: "2",
    name: 'Bom Baiano',
    image: require('../../../../assets/images/mock/capa-2.jpg'),
    logo: require('../../../../assets/images/mock/logo-2.png')
  },
  {
    id: "3", name: 'Restaurante da Orla',
    image: require('../../../../assets/images/mock/capa-3.jpg'),
    logo: require('../../../../assets/images/mock/logo-3.jpg')
  },
  {
    id: "4",
    name: 'Estabelecimento lorem ipsum',
    image: require('../../../../assets/images/mock/capa-1.png'),
    logo: require('../../../../assets/images/mock/logo-1.png')
  },
  {
    id: "5",
    name: 'Bom Baiano',
    image: require('../../../../assets/images/mock/capa-2.jpg'),
    logo: require('../../../../assets/images/mock/logo-2.png')
  },
  {
    id: "6", name: 'Restaurante da Orla',
    image: require('../../../../assets/images/mock/capa-3.jpg'),
    logo: require('../../../../assets/images/mock/logo-3.jpg')
  },
];


export default function Estabelecimentos() {
  const [isSaved, setIsSaved] = useState(false);
  const [showMenu, setShowMenu] = useState(false)
  const [modalVisivel, setModalVisivel] = useState(false);
  const [estabelecimentoSelecionado, setEstabelecimentoSelecionado] = useState<User>();
  const [subTab, setSubTab] = useState<'todos' | 'cupom'>('todos');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const { data: establishments = [] } = useEstablishments();

  const filteredEstablishments = establishments.filter((est) => {
    if (subTab === 'cupom') return est.coupon_enabled === true;
    return true;
  });

  const openDeleteModal = (item: any) => {
    setSelectedItem(item);
    setDeleteModalVisible(true);
  };

  const abrirDetalhes = (item: any) => {
    setEstabelecimentoSelecionado(item);
    setModalVisivel(true);
  };

  return (
    <LinearGradient
      colors={['#FFF', '#FFF0C8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.8 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={'#FFFBE6'} />
        <Header />
        <View style={styles.scrollContent}>


          <View>
            <Text style={styles.textPage}>Estabelecimentos </Text>
          </View>
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

          <FlatList
            data={filteredEstablishments}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <RestaurantCardSearch item={item as any} onDeletePress={() => openDeleteModal(item)} moreDetailsPress={() => abrirDetalhes(item)} />
            )}
            // Espaço extra embaixo para o menu não cobrir o último item
            ListFooterComponent={<View style={{ height: 100 }} />}
          />

        </View>
      </SafeAreaView>

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
      <ReadMoreModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        title="Confirmar Exclusão"
        type="small"
      >
        <VerbetesExcludConfirm
          onCancel={() => setDeleteModalVisible(false)}
          onConfirm={() => {
            console.log("Excluindo:", selectedItem?.id);
            setDeleteModalVisible(false);
          }}
        />
      </ReadMoreModal>

      {/* O SEU MODAL SENDO USADO AQUI */}
      <ReadMoreModal
        visible={modalVisivel}
        onClose={() => setModalVisivel(false)}
        title="Estabelecimento ipsum"
        type="full"
      >
        {/* O novo componente entra como 'children' mágico aqui dentro! */}
        <EstabelecimentoDetalhes establishment={estabelecimentoSelecionado as User} />
      </ReadMoreModal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    // backgroundColor: '#FFFBE6',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  textPage: {
    fontSize: 18,
    // fontStyle: normal;
    fontWeight: 700,
    lineHeight: 24, /* 133.333% */
    letterSpacing: 0.36,
    color: '#454545',
    marginVertical: 32
  },
  restCard: {
    // backgroundColor: 'blue', // Fundo transparente/bege
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  restCover: {
    width: '100%',
    height: 120,
    borderRadius: 16,
    backgroundColor: 'blue',
  },
  restOverlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(0,0,0,0.1)',
    height: 87,
    // borderTopLeftRadius: 16,
    // borderTopRightRadius: 16,
  },
  restActions: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    backgroundColor: '#365D3D',
    padding: 6,
    borderRadius: 8,
  },
  restContent: {
    // paddingTop: 10,
    paddingLeft: 76, // Espaço para o logo
    minHeight: 50,
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'absolute',
    left: -72,
    bottom: -30, // Sobe para cima da imagem
    width: 77,
    height: 77,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#fff',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  // logoCircle: {
  //   flex: 1,
  //   borderRadius: 100,
  //   backgroundColor: 'red',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  restName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    // backgroundColor: 'purple',
    lineHeight: 24,
    marginLeft: 5
  },

  dropdownMenu: {
    position: 'absolute',
    top: 37, // Aparece logo abaixo do botão
    right: 0,
    width: 188,
    backgroundColor: NEUTRAL.lighter, // Cor creme clarinha da sua imagem
    borderRadius: 8,
    // Sombras
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
    zIndex: 999,
    padding: 8
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 16,
    // backgroundColor: 'red'
  },
  menuItemHighlight: {
    backgroundColor: primary.light, // Substitua pelo hex exato do seu vermelho clarinho

    borderRadius: 6,
    width: "100%",
    // padding: 8
  },
  menuItemText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
  menuItemTextRed: {
    fontSize: 14,
    color: '#A31919', // Vermelho para a opção excluir
    fontWeight: '700',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#EBE0CC', // Linha divisória sutil
    marginHorizontal: 8,
  },

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

})