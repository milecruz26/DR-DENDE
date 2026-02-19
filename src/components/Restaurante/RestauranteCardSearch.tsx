import { Feather } from "@expo/vector-icons";
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface RestaurantCardProps {
  item: {
    id: number;
    name: string;
    image: ImageSourcePropType;
    logo: ImageSourcePropType;

  }
}


export const RestaurantCardSearch = ({ item }: RestaurantCardProps) => (
  <View style={styles.restCard}>
    {/* Imagem de Fundo (Capa) */}
    <Image source={item.image} style={styles.restCover} />

    {/* Overlay gradiente ou escuro se quiser */}
    <View style={styles.restOverlay} />

    {/* Botoes flutuantes (Bookmark e Menu) */}
    <View style={styles.restActions}>
      <TouchableOpacity style={styles.iconBtn}>
        <Image source={require('../../../assets/images/icones/saved-line-white.png')} style={{ width: 24, height: 24 }} />
        {/* <Feather name="bookmark" size={18} color="#FFF" /> */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconBtn}>
        <Feather name="more-vertical" size={18} color="#FFF" />
      </TouchableOpacity>
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
  </View>
);

const styles = StyleSheet.create({
  restCard: {
    // backgroundColor: 'blue', // Fundo transparente/bege
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  restCover: {
    width: '100%',
    height: 87,
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
})