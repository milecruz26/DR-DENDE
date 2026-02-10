import { CategoryChip } from '@/components/CategoryChip';
import { DateSelector } from '@/components/DataSelector';
import { EventItem } from '@/components/EventItem';
import { Header } from '@/components/Header';
import { HighlightCard } from '@/components/HighlightCard';
import { MockTabBar } from '@/components/MockTabBar';
import { SectionTitle } from '@/components/SectionTitle';
import { VerbeteCard } from '@/components/VerbeteCard';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#FFFBE6'} />

      <View style={styles.contentContainer}>
        {/* Header Fixo */}
        <Header />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          {/* Seção Destaques */}
          <SectionTitle title="Destaques" />
          <HighlightCard />

          {/* Categorias (Scroll Horizontal) */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            <CategoryChip label="Comida com dendê" />
            <CategoryChip label="Tira-gosto" />
            <CategoryChip label="Afro-indígena" />
          </ScrollView>

          {/* Seção Verbetes */}
          <SectionTitle title="Verbetes" showLink />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            <VerbeteCard
              title="FEIJOADA"
              description="A feijoada é um prato muito popular em todo o Brasil."
            />
            <VerbeteCard
              title="FEIJOADA"
              description="A feijoada é um prato muito popular em todo o Brasil."
            />
            {/* Adicione mais cards aqui se necessário */}
            <View style={{ width: 20 }} />
          </ScrollView>

          {/* Seção Eventos */}
          <SectionTitle title="Eventos" showLink />
          <View style={styles.eventContainer} >
            <DateSelector />
            <View style={styles.eventList}>
              <EventItem title="FEIJOADA DE SEU ZÉ" />
              <EventItem title="CEIA BENEFICENTE" />
              <EventItem title="CEIA BENEFICENTE" />
              <EventItem title="REUNIÃO GERAL" />
            </View>
          </View>


          {/* Espaço extra para não ficar atrás da TabBar */}
          <View style={{ height: 100 }} />

        </ScrollView>

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