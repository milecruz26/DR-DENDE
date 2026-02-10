import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';


export const MockTabBar = () => (
  <View style={styles.tabBar}>
    <TouchableOpacity>
      <Image source={require('../../assets/images/icones/home-line-orange.png')} style={{ height: 24, width: 24 }} />
    </TouchableOpacity>
    <TouchableOpacity>
      <Image source={require('../../assets/images/icones/book-line-white.png')} style={{ height: 24, width: 24 }} />
    </TouchableOpacity>

    <View style={styles.searchButtonContainer}>
      <TouchableOpacity style={styles.searchButton}>
        <Image source={require('../../assets/images/icones/search-line-white.png')} style={{ height: 32, width: 32 }} />
        {/* <Feather name="search" size={32} color="#FFF" /> */}
      </TouchableOpacity>
    </View>

    <TouchableOpacity>
      <Image source={require('../../assets/images/icones/calendar-line-white.png')} style={{ height: 24, width: 24 }} />
    </TouchableOpacity>
    <TouchableOpacity>
      <Image source={require('../../assets/images/icones/dinner-line-white.png')} style={{ height: 24, width: 24 }} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    backgroundColor: '#2F4F2F',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 47, // Para safe area no iPhone X+
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    boxShadow: '0 -4px -4.6px -2px rgba(25, 25, 28, 0.17)', // Sombra para dar profundidade
  },
  searchButtonContainer: {
    // top: -20, // Efeito flutuante
  },
  searchButton: {
    backgroundColor: '#1E331E',
    width: 64,
    height: 64,
    borderRadius: 8,
    // padding: 16,
    justifyContent: 'center',
    alignItems: 'center',

  },
});