// src/app/(protegida)/index.tsx
import { CategoryChip } from '@/components/CategoryChip';
import EventCalendarList from '@/components/Eventos/ListaEventos';
import { Header } from '@/components/Header';
import { HighlightCard } from '@/components/HighlightCard';
import EventsInfo from '@/components/Modal/Info/EventsInfo';
import { ReadMoreModal } from '@/components/Modal/ModalVerbete';
import { SectionTitle } from '@/components/SectionTitle';
import { VerbeteCard } from '@/components/VerbeteCard';
import { useAuth } from '@/context/AuthContext';
import { useDislikeDish, useLikedDishes, useLikeDish } from '@/hooks/useDish';
import { useAllEntries } from '@/hooks/useEntries';
import { useEventById } from '@/hooks/useEvents';
import { Entry } from '@/interfaces';
import { formatDateTime } from '@/utils/formatDateTime';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  const { user } = useAuth();
  const { data: verbetes, } = useAllEntries();
  const { data: likedDishes } = useLikedDishes();
  const { mutate: like } = useLikeDish();
  const { mutate: dislike } = useDislikeDish();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const { data: selectedEvent, isLoading } = useEventById(selectedEventId || '');
  // const [verbetes, setVerbetes] = useState<Verbete[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const likedIds = likedDishes?.map(d => d.id) || [];

  const handleToggleLike = (id: string) => {
    if (likedIds.includes(id)) {
      dislike(id);
    } else {
      like(id);
    }
  };
  console.log('🧠 Verbetes no front:', verbetes);

  return (
    <LinearGradient
      colors={['#FFF', '#FFF0C8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.8 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={'#FFFBE6'}
          barStyle={'dark-content'}
        />

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

            {/* <Pressable > */}
            <SectionTitle title="Verbetes" showLink />
            {/* </Pressable> */}

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>

              {verbetes?.map((verbete: Entry) => (
                <VerbeteCard
                  key={verbete.id}
                  id={verbete.id}
                  title={verbete.name}
                  description={verbete.entry_text}
                  imagem={verbete.picture}
                  isLiked={likedIds.includes(verbete.id)}
                  onToggleLike={handleToggleLike}
                  showBookmark={user?.user_type === 'common'}
                />
              ))}
              {/* NÃO É PRA DELETAR ATÉ SER APLICADO */}
              {/* {loading ? (
                <ActivityIndicator size="large" color="#E87C38" style={{ margin: 20 }} />
              ) : (
                verbetes?.map((verbete) => (
                  <VerbeteCard
                    key={verbete.id}
                    id={verbete.id}
                    title={verbete.name}
                    description={verbete.entry_text}
                    imagem={verbete.picture}
                  />
                ))
              )} */}
              <View style={{ width: 20 }} />
            </ScrollView>
            {/* Seção Eventos */}
            <Pressable onPress={() => router.replace('/(protegida)/eventos')}>

              <SectionTitle title="Eventos" showLink />
            </Pressable>
            <EventCalendarList onSelectEvent={(event) => setSelectedEventId(event?.id!)} />

            {/* Espaço extra para não ficar atrás da TabBar */}
            <View style={{ height: 100 }} />

          </ScrollView>


        </View>

      </SafeAreaView>
      <ReadMoreModal
        visible={!!selectedEventId}
        onClose={() => setSelectedEventId(null)}
        title={selectedEvent?.name || ''}
      >
        {selectedEvent && (
          <EventsInfo
            location={`${selectedEvent.address.street}, ${selectedEvent.address.neighborhood} - ${selectedEvent.address.city}`}
            date={formatDateTime(selectedEvent.event_date)}
            description={selectedEvent.description}
          />
        )}
      </ReadMoreModal>
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