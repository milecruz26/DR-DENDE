import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomDatePicker from '../CustomDatePicker';
import { DateSelector } from '../DataSelector';
import { EventItem } from '../EventItem';

export default function ListaEventos() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  useEffect(() => {
    console.log('data:', new Date())
    console.log('data atualizada:', selectedDate)
  }, [])
  return (
    <>
      <View style={styles.eventContainer} >
        <DateSelector
          currentDate={new Date()}
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
      </View>
      <CustomDatePicker
        visible={showDatePicker}
        selectedDate={selectedDate}
        onClose={() => setShowDatePicker(false)}
        onSelectDate={(date) => {
          setSelectedDate(date);
          setShowDatePicker(false);
        }}
      />
    </>
  )
}

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