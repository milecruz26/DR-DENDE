import { useAuth } from '@/context/AuthContext';
import Colors from "@/theme/Colors";
import { router } from "expo-router";
import { useState } from "react";
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";

export interface RestaurantCardProps {
  item: {
    id: number;
    name: string;
    image: ImageSourcePropType;
    logo: ImageSourcePropType;

  },
  onDeletePress?: () => void,
  moreDetailsPress?: () => void,
}

const { NEUTRAL, primary } = Colors


export const RestaurantCardSearch = ({ item, onDeletePress, moreDetailsPress }: RestaurantCardProps) => {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [showMenu, setShowMenu] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleDeletePress = () => {
    setShowMenu(false);
    setShowDeleteModal(true); // Abre o modal ao invés de excluir direto
  };

  const confirmDelete = () => {
    console.log("Item excluído:", item.id);
    setShowDeleteModal(false);
    // Aqui você adiciona a lógica real de exclusão (chamada de API, atualização de estado global, etc)
  };

  return (
    <>

      <Pressable style={[styles.restCard, { zIndex: showMenu ? 10 : 1 }]} onPress={moreDetailsPress}>
        {/* Imagem de Fundo (Capa) */}
        <Image source={item.image} style={styles.restCover} />

        {/* Overlay gradiente ou escuro se quiser */}
        <View style={styles.restOverlay} />

        {/* Botoes flutuantes (Bookmark e Menu) */}
        <View style={styles.restActions}>
          {user?.user_type === "common" &&
            <>
              <Pressable style={styles.iconBtn} onPress={toggleSave}>
                <Image source={
                  isSaved
                    ? require('../../../assets/images/icones/saved-filled-line-white.png')
                    : require('../../../assets/images/icones/saved-line-white.png')
                } style={{ width: 24, height: 24 }} />
              </Pressable>
            </>
          }
          {/* 3. Container relativo para ancorar o menu absoluto */}
          {user?.user_type !== "establishment" &&

            <View style={{ position: 'relative' }}>
              <Pressable style={styles.iconBtn} onPress={toggleMenu}>
                <Image source={require('../../../assets/images/icones/tres-pontos-line-white.png')} style={{ width: 24, height: 24 }} />
              </Pressable>

              {/* 4. O Menu Flutuante */}
              {showMenu && (
                <View style={styles.dropdownMenu}>

                  {user?.user_type === "common" &&

                    <Pressable onPress={() => {
                      setShowMenu(false);
                      // Navega para a tela de denúncia passando o ID do estabelecimento
                      router.push(`/configuracoes/denunciar?establishment_id=${item.id}`);
                    }}>
                      <View style={[styles.menuItem, styles.menuItemHighlight]}>
                        <Text style={styles.menuItemText}>Denunciar</Text>
                        <Image source={require('../../../assets/images/icones/megaphone-line-neutral.png')} style={{ width: 16, height: 16 }} />
                      </View>
                    </Pressable>
                  }
                  {user?.user_type === "staff" &&
                    <>
                      {/* <View style={styles.menuDivider} /> */}

                      <Pressable onPress={onDeletePress}>
                        <View style={styles.menuItem}>
                          <Text style={styles.menuItemTextRed}>Excluir</Text>
                          <Image source={require('../../../assets/images/icones/trash-line-red.png')} style={{ width: 16, height: 16 }} />
                        </View>
                      </Pressable>
                    </>
                  }



                </View>
              )}
            </View>
          }
        </View>


        {/* Conteúdo inferior */}
        <View style={styles.restContent}>
          {/* Logo Circular sobreposto */}
          <View
          // style={styles.logoContainer}
          // style={styles.logoCircle}
          >

            {item.logo ?
              <Image source={item.logo}
                style={styles.logoContainer}
              /> :
              <Text style={{ fontSize: 8, textAlign: 'center', fontWeight: 'bold' }}>LOGO</Text>
            }

          </View>
          <Text style={styles.restName}>{item.name}</Text>
        </View>
      </Pressable>

    </>

  )
};

const styles = StyleSheet.create({
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
    // backgroundColor: 'blue',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Fundo escurecido
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

})