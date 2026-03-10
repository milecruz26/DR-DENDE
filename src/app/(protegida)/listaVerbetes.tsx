import { Header } from '@/components/Header';
import { MockTabBar } from '@/components/MockTabBar';
import { VerbeteCardSearch } from '@/components/Verbete/VerbeteCardSearch';
import Colors from '@/theme/Colors';
import React from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = Colors;
const { NEUTRAL, primary, SECONDARY } = COLORS

type CategoryType = 'verbetes' | 'restaurantes';

// Mock Verbetes
const MOCK_VERBETES = [
  { id: 1, title: 'PASSARINHA', desc: 'A passarinha, apesar de como é chamada, nada tem a ver...', bg: '#E0F0E2', img: require('../../../assets/images/pratos/feijoada.png') },
  { id: 2, title: 'FEIJOADA', desc: 'A feijoada é um prato muito popular em todo o Brasil.', bg: '#FFC84A', img: require('../../../assets/images/pratos/passarinha.png') },
];




export default function ListaVerbertes() {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#FFFBE6'} />

      <View style={styles.contentContainer}>
        {/* Header Fixo */}
        <Header />

        {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}> */}
        <Text style={styles.pageTitle}>Verbetes</Text>
        <FlatList
          data={MOCK_VERBETES as any[]}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <VerbeteCardSearch
              item={item} index={index} favoritos={true}

            />
          )}
        />


        {/* </ScrollView> */}

        {/* Bottom Tab Bar (Posicionada Absolutamente) */}
        <MockTabBar />
      </View>
    </SafeAreaView>
  );
}

// ==========================================
// 3. Estilos
// ==========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBE6',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
  },

  // Chips
  horizontalScroll: {
    marginVertical: 24,

  },

  eventContainer: {
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 24,
    // backgroundColor: 'blue',
    gap: 24,
    marginTop: 24

  },

  eventList: {
    gap: 8,
    // backgroundColor: '#FFF',
  },


});