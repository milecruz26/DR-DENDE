import { SecondaryButton } from '@/components/Buttons/SecondaryButton';
import { Header } from '@/components/Header';
import { VerbeteCardSearch } from '@/components/Verbete/VerbeteCardSearch';
import { useAuth } from '@/context/AuthContext';
import { apiGetVerbetes, Verbete } from '@/data/mockVerbetes';
import Colors from '@/theme/Colors';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
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
  const router = useRouter();
  const { user } = useAuth();
  const [verbetes, setVerbetes] = useState<Verbete[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarVerbetes = async () => {
      try {
        const dados = await apiGetVerbetes();
        setVerbetes(dados);
      } catch (error) {
        console.error("Erro ao buscar verbetes", error);
      } finally {
        setLoading(false);
      }
    };
    carregarVerbetes();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#FFFBE6'} />

      <View style={styles.contentContainer}>

        <Header />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, }}>
          <Text style={styles.pageTitle}>Verbetes</Text>
          {user?.role !== 'usuario' && (
            <SecondaryButton
              onPress={() => router.push('/configuracoes/adicionarVerbetePasso1')}
              title='+ Criar Novo'
              size='small'
            />)}
        </View>

        <FlatList
          data={verbetes}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <VerbeteCardSearch
              img={item.img}
              id={item.id}
              title={item.titulo}
              desc={item.descricaoCurta}
              // bg={item.bg}
              index={index}
              favoritos={true} />
          )}
          style={{ marginTop: 16 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
        />


        {/* </ScrollView> */}


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