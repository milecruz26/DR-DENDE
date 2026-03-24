import { useRouter } from 'expo-router';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Colors from '@/theme/Colors';
const { primary } = Colors;
export const HighlightCard = () => {
  const router = useRouter();
  return (

    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.push('/verbete')}
    >
      {/* <Link href="/verbete" asChild> */}

      <View style={styles.highlightCard}>
        {/* Imagem Placeholder - Substitua pela sua URL ou require */}
        <View style={styles.highlightImageContainer}>
          <Image
            source={require('../../assets/images/pratos/PASSARINHA.png')} // Imagem transparente do prato
            style={styles.highlightImage}
            resizeMode="cover"
          />
          {/* Badge "Novo" simulado */}
          <View style={styles.badge}>
            <Image
              source={require('../../assets/images/icones/badge-new.png')} // Imagem transparente do badge "Novo"
              style={styles.badgeImg}
            />
          </View>
        </View>

        <View style={styles.highlightContent}>
          <Text style={styles.dishTitle}>PASSARINHA</Text>
          <Text style={styles.dishDesc}>
            Lorem ipsum dollorLorem ipsum dollor Lorem ipsum dollor
          </Text>
        </View>
      </View>
      {/* </Link> */}
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  highlightCard: {
    backgroundColor: primary.lighter,
    borderRadius: 20,
    padding: 15,
    minHeight: 280,
    boxShadow: '0 4px 8px -2px rgba(25, 25, 28, 0.12)', // Sombra leve para dar profundidade
  },
  highlightImageContainer: {
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  highlightImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    // Aqui você usaria uma imagem transparente do prato
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    // padding: 10,
    borderRadius: 20, // Simulando o formato de explosão/starburst
    // transform: [{ rotate: '15deg' }],

  },
  badgeImg: {
    height: 83,
    width: 83,
  },
  highlightContent: {
    marginTop: 10,
  },
  dishTitle: {
    fontSize: 24,
    fontWeight: '800', // Extra bold simulado
    color: '#E87C38',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  dishDesc: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
});