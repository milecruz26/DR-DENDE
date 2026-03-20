import { SecondaryButton } from '@/components/Buttons/SecondaryButton';
import { Header } from '@/components/Header';
import { InfoPill } from '@/components/InfoPill';
import { InstructionStep } from '@/components/InstructionStep';
import { apiGetVerbeteById, Verbete } from '@/data/mockVerbetes';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, Dimensions,
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

import arrow from '@/assets/images/icones/arrow-left-line-white.png';
import share from "@/assets/images/icones/share-line-white.png";
import { IngredientItem } from '@/components/IngredientItem';


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
  const { id } = useLocalSearchParams<{ id: string }>();

  const [modalVisible, setModalVisible] = useState(false);
  const [verbete, setVerbete] = useState<Verbete | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarDetalhes = async () => {
      if (!id) return;
      try {
        const dados = await apiGetVerbeteById(id);
        if (dados) {
          setVerbete(dados);
        }
      } catch (error) {
        console.error("Erro", error);
      } finally {
        setLoading(false);
      }
    };

    buscarDetalhes();
  }, [id]);

  const navegarParaHome = () => router.back();

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeAreaContent, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.orangeHeader} />
      </SafeAreaView>
    );
  }

  if (!verbete) {
    return (
      <SafeAreaView style={[styles.safeAreaContent, { justifyContent: 'center' }]}>
        <Text>Prato não encontrado!</Text>
        <SecondaryButton title="Voltar" onPress={navegarParaHome} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaContent}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.orangeHeader} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header Curvo Laranja */}
        <View style={styles.curvedHeader} />

        {/* 1. Header Usuário (Avatar e CEP) */}
        {/* <TopUserHeader /> */}
        <Header />

        {/* 2. Header de Navegação (Voltar / Título / Share) */}
        <View style={styles.navHeader}>
          <Pressable onPress={navegarParaHome} style={{ zIndex: 99 }}>
            <Image
              source={arrow}
              style={styles.navButton}
            />
          </Pressable>

          <Text style={styles.headerTitle}>{verbete.titulo}</Text>

          <TouchableOpacity onPress={navegarParaHome}>
            <Image
              source={share}
              style={styles.navButton}
            />
          </TouchableOpacity>
        </View>
        {/* Imagem do Prato */}
        <View style={styles.imageContainer}>
          <Image source={verbete.img} style={styles.mainImage} resizeMode="contain" />
        </View>

        {/* Conteúdo do Corpo */}
        <View style={styles.bodyContainer}>

          {/* SEÇÃO TEXTO DO PRATO: */}
          <View style={styles.plateContainer}>
            <Text style={styles.sectionTitle}>Sobre o prato</Text>
            <Text style={styles.descriptionText}>{verbete.sobre}</Text>
            <SecondaryButton
              title='Ler tudo'
              onPress={() => setModalVisible(true)}
              size='small'
            />
          </View>

          {/* SEÇÃO INGREDIENTES */}
          {/* TODO: fix scroll */}
          <View style={styles.ingredientContainer}>
            <Text style={styles.sectionTitle}>Ingredientes ({verbete.ingredientes.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ingredientsScroll}>
              {verbete.ingredientes.map((ing, idx) => (
                <IngredientItem key={idx} name={ing.nome} ingredientPath={ing.icone} />
              ))}
              <View style={{ width: 20 }} />
            </ScrollView>
          </View>

          <InfoPill tempo={verbete.tempoPreparo} dificuldade={verbete.dificuldade} categoria={verbete.categoria} />

          {/* SEÇÃO COMO FAZER */}
          <View style={styles.stepsListContainer}>
            <Text style={styles.sectionTitle}>Como fazer</Text>
            <View style={styles.stepsList}>
              {verbete.etapas.map((etapa, idx) => (
                <InstructionStep key={idx} number={idx + 1} text={etapa} />
              ))}
            </View>
          </View>

          <View style={{ height: 20 }} />
        </View>
      </ScrollView>
      <ReadMoreModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <VerbetesInfo content={verbete.sobre} />
      </ReadMoreModal>
      {/* <ReadMoreModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        data={MOCK_DATA}
      /> */}
      {/* <MockTabBar /> */}
    </SafeAreaView>
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
    display: "flex"
  },
  curvedHeader: {
    backgroundColor: COLORS.orangeHeader,
    width: "100%",
    height: 280,
    borderBottomLeftRadius: 600,
    borderBottomRightRadius: 600,
    alignSelf: 'center',
    paddingTop: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
    display: "flex",
    position: 'absolute',
    zIndex: 0,
    left: 0,
    top: 0,
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
    paddingVertical: 20,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '400',
    color: '#FFF',
    textTransform: 'uppercase',
    letterSpacing: 4,
    flex: 1,
    textAlign: 'center',
    fontFamily: "OfertaDoDia"
  },
  navButton: {
    width: 28,
    height: 28,
    padding: 4,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Imagem Principal
  imageContainer: {
    zIndex: 5,
    position: "relative",
  },
  mainImage: {
    width: "100%",
    height: 200,
    marginBottom: 24,
  },
  // ... (Restante dos estilos body, title, etc. permanecem iguais) ...
  bodyContainer: {
    paddingHorizontal: 16,
    marginVertical: 0,
    gap: 0,
    zIndex: 10,
  },
  plateContainer: {
    marginBottom: 0,
    paddingBottom: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#D4C5B9',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.textGray,
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 16
  },

  ingredientContainer: {
    paddingVertical: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#D4C5B9',
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
    paddingVertical: 20,
  },
  stepsList: {
    marginTop: 10,
    gap: 20,
  },

});