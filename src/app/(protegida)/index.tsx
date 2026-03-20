import { CategoryChip } from '@/components/CategoryChip';
import { Header } from '@/components/Header';
import { HighlightCard } from '@/components/HighlightCard';
import { SectionTitle } from '@/components/SectionTitle';
import { VerbeteCard } from '@/components/VerbeteCard';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import EventCalendarList from '@/components/Eventos/ListaEventos';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // useEffect(() => {
  //   console.log('data:', new Date())
  //   console.log('data atualizada:', selectedDate)
  // }, [])
  return (
    <LinearGradient
      colors={['#FFF', '#FFF0C8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.8 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'#FFFBE6'} />

        <View style={styles.contentContainer}>
          {/* Header Fixo */}
          <Header />

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

            {/* Seção Destaques */}
            <SectionTitle title="Destaques" />
            <Link href="/verbete" asChild>
              <HighlightCard />
            </Link>

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
            <EventCalendarList />
            {/* <View style={styles.eventContainer} >
              <DateSelector
                currentDate={selectedDate}
                onDateChange={(newDate) => setSelectedDate(newDate)}
                onOpenPicker={() => setShowDatePicker(true)}
              />
              <View style={styles.eventList}>
                <EventItem title="FEIJOADA DE SEU ZÉ"
                  onPress={() => setModalVisible(true)}
                />
                <EventItem title="CEIA BENEFICENTE" />
                <EventItem title="CEIA BENEFICENTE" />
                <EventItem title="REUNIÃO GERAL" />
              </View>
            </View> */}


            {/* Espaço extra para não ficar atrás da TabBar */}
            <View style={{ height: 100 }} />

          </ScrollView>


        </View>
        {/* MODAL DE DATA (O mesmo que você usa na outra tela) */}
        {/* <CustomDatePicker
          visible={showDatePicker}
          selectedDate={selectedDate}
          onClose={() => setShowDatePicker(false)}
          onSelectDate={(date) => {
            setSelectedDate(date);
            setShowDatePicker(false);
          }}
        />
        <ReadMoreModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title={MOCK_DATA.titulo}
        >

          <EventsInfo
            location={MOCK_DATA.location}
            date={MOCK_DATA.date}
            description={MOCK_DATA.aboutEvent}
          />

        </ReadMoreModal> */}
      </SafeAreaView>
    </LinearGradient>
  );
}

// ==========================================
// 3. Estilos
// ==========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: 80,
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