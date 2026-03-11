import React, { useState } from 'react';
import { View } from 'react-native';
import { DateSelector } from '../DataSelector';
import { EventItem } from '../EventItem';

export default function ListaEventos() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.eventContainer} >
      <DateSelector />
      <View style={styles.eventList}>
        <EventItem title="FEIJOADA DE SEU ZÉ"
          onPress={() => setModalVisible(true)}
        />
        <EventItem title="CEIA BENEFICENTE" />
        <EventItem title="CEIA BENEFICENTE" />
        <EventItem title="REUNIÃO GERAL" />
      </View>
    </View>
  )
}