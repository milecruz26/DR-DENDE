import { SecondaryButton } from '@/components/Buttons/SecondaryButton';
import { Header } from '@/components/Header';
import { InfoPill } from '@/components/InfoPill';
import { IngredientItem } from '@/components/IngredientItem';
import { InstructionStep } from '@/components/InstructionStep';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import VerbetesInfo from '@/components/Modal/Info/VerbetesInfo';
import { ReadMoreModal } from '@/components/Modal/ModalVerbete';
import { MOCK_DATA } from '@/data/mock';


const COLORS = {
  background: '#FFFBE6',
  orangeHeader: '#E87C38',
  textDark: '#2C2C2C',
  textGreen: '#2F4F2F',
  textGray: '#555',
  cardBeige: '#F2E8D5',
  white: '#FFFFFF',
};

export default function VerbeteScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const navegarParaHome = () => {
    router.back();
  }

  return (
    // <View style={styles.container}>
    <SafeAreaView style={styles.safeAreaContent}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.orangeHeader} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Header Curvo Laranja (Agora mais alto para caber tudo) */}
        <View style={styles.curvedHeader}>

          {/* 1. Header Usuário (Avatar e CEP) */}
          {/* <TopUserHeader /> */}
          <Header />

          {/* 2. Header de Navegação (Voltar / Título / Share) */}
          <View style={styles.navHeader}>
            <Pressable
              onPress={navegarParaHome}
              style={{ zIndex: 99 }}
            >
              <Image
                source={require('../../../../assets/images/icones/arrow-left-line-white.png')}
                style={styles.navButton}
              />

            </Pressable>

            <Text style={styles.headerTitle}>PASSARINHA</Text>

            <TouchableOpacity
              onPress={navegarParaHome}
            >
              <Image
                source={require('../../../../assets/images/icones/share-line-white.png')}
                style={styles.navButton}
              />

            </TouchableOpacity>
          </View>

        </View>

        {/* Imagem do Prato */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../../assets/images/pratos/passarinha.png')}
            style={styles.mainImage}
            resizeMode="contain" // Garante que a imagem caiba inteira
          />
        </View>

        {/* Conteúdo do Corpo */}
        <View style={styles.bodyContainer}>

          {/* SEÇÃO TEXTO DO PRATO: */}
          <View style={styles.plateContainer}>
            <Text style={styles.sectionTitle}>Sobre o prato</Text>
            <Text style={styles.descriptionText}>
              A passarinha, apesar de como é chamada, nada tem a ver com uma ave.
              Na verdade, é o nome popular dado ao prato feito com o baço do boi.
              Assim como outras vísceras de origem animal, a passarinha possui alto valor nutricional...
            </Text>
            <SecondaryButton
              title='Ler tudo'
              onPress={() => setModalVisible(true)}
              size='small'

            />

          </View>

          {/* SEÇÃO INGREDIENTES */}
          <View style={styles.ingredientContainer}>
            <Text style={styles.sectionTitle}>Ingredientes (6)</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ingredientsScroll}>
              <IngredientItem name="Baço bovino" ingredientPath='dende' />
              <IngredientItem name="Pimentao" ingredientPath='pimentao' />
              <IngredientItem name="Sal" ingredientPath="sal" />
              <IngredientItem name="manteiga" ingredientPath='manteiga' />
              <IngredientItem name="Baço bovino" ingredientPath='dende' />
              <IngredientItem name="Pimentao" ingredientPath='pimentao' />
              <IngredientItem name="Sal" ingredientPath="sal" />
              <IngredientItem name="manteiga" ingredientPath='manteiga' />
              {/* <IngredientItem name="Pimenta" color="#D92B2B" /> */}
              <View style={{ width: 20 }} />
            </ScrollView>
          </View>

          <InfoPill />

          {/* SEÇÃO COMO FAZER */}
          <View style={styles.stepsListContainer}>
            <Text style={styles.sectionTitle}>Como fazer</Text>
            <View style={styles.stepsList}>
              <InstructionStep number={1} text="Limpe bem o baço tirando a pele;" />
              <InstructionStep number={2} text="Corte em uma espessura menor, fazendo talhos;" />
              <InstructionStep number={3} text="Tempere com limão, sal, pimenta e azeite;" />
              <InstructionStep number={4} text="Deixe na geladeira por 1 hora para pegar sabor;" />
              <InstructionStep number={5} text="Na sequência, frite a iguaria no azeite de dendê bem quente;" />
              <InstructionStep number={6} text="Para servir, junte com molho de pimenta, vinagrete, farofa e pronto." />
            </View>
          </View>

          <View style={{ height: 20 }} />
        </View>
      </ScrollView>
      <ReadMoreModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >

        <VerbetesInfo content={MOCK_DATA.content} />

      </ReadMoreModal>
      {/* <ReadMoreModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        data={MOCK_DATA}
      /> */}
      {/* <MockTabBar /> */}
    </SafeAreaView>
    // </View>
  );
}

// ==========================================
// 3. Estilos Atualizados
// ==========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBE6',
  },
  scrollContent: {

    // paddingHorizontal: 20,
    // paddingBottom: 20,
  },

  // Header Curvo
  curvedHeader: {
    backgroundColor: COLORS.orangeHeader,
    height: 280, // Aumentei a altura para caber os dois headers
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300,
    // width: '105%',
    alignSelf: 'center',
    position: 'relative',
    top: -20,
    paddingTop: 20,
    alignItems: 'center',
  },
  safeAreaContent: {
    flex: 1,
    // backgroundColor: '#FFFBE6',
    width: Dimensions.get('window').width, // 
    alignItems: 'center',
  },


  // Header Navegação (Voltar / Título)
  navHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    textTransform: 'uppercase',
    fontStyle: 'italic',
  },
  navButton: {
    width: 28,
    height: 28,

    padding: 4,
    // zIndex: 99

  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Imagem Principal
  imageContainer: {
    marginTop: -200, // Ajuste fino para a nova altura do header
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,

  },
  mainImage: {
    width: "100%",
    height: 210,
  },

  // ... (Restante dos estilos body, title, etc. permanecem iguais) ...
  bodyContainer: {
    paddingHorizontal: 16,
    marginVertical: 24,
    gap: 24

  },
  plateContainer: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,

    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.textGray,
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 16
  },

  ingredientContainer: {
    // backgroundColor: 'red'
  },

  ingredientsScroll: {
    flexDirection: 'row',

    gap: 8,

  },

  ingredientCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 2,
    borderColor: '#FFF',
  },
  ingredientText: {
    fontSize: 12,
    color: COLORS.textGray,
    textAlign: 'center',
    lineHeight: 14,
  },
  stepsListContainer: {

  },
  stepsList: {
    marginTop: 10,
    gap: 20,
  },

});