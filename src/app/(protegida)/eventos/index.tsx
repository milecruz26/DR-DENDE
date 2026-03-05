import { DateSelector } from '@/components/DataSelector';
import { EventItem } from '@/components/EventItem';
import { Header } from '@/components/Header';
import EventsInfo from '@/components/Modal/Info/EventsInfo';
import { ReadMoreModal } from '@/components/Modal/ModalVerbete';
import { MOCK_DATA } from '@/data/mock';
import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Eventos() {
  const [modalVisivel, setModalVisivel] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#FFFBE6'} />
      <Header />
      <SafeAreaView style={styles.scrollContent}>


        <View>
          <Text style={styles.textPage}>Estabelecimentos </Text>
        </View>

        <View style={styles.eventContainer} >
          <DateSelector />
          <View style={styles.eventList}>
            <EventItem title="FEIJOADA DE SEU ZÉ"
              onPress={() => setModalVisivel(true)}
            />
            <EventItem title="CEIA BENEFICENTE" />
            <EventItem title="CEIA BENEFICENTE" />
            <EventItem title="REUNIÃO GERAL" />
          </View>
        </View>
      </SafeAreaView>

      <ReadMoreModal
        visible={modalVisivel}
        onClose={() => setModalVisivel(false)}
        title={MOCK_DATA.titulo}
      >

        <EventsInfo
          location={MOCK_DATA.location}
          date={MOCK_DATA.date}
          description={MOCK_DATA.aboutEvent}
        />

      </ReadMoreModal>

    </View>
  );
}

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
  textPage: {
    fontSize: 18,
    // fontStyle: normal;
    fontWeight: 700,
    lineHeight: 24, /* 133.333% */
    letterSpacing: 0.36,
    color: '#454545',
    marginVertical: 32
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
})