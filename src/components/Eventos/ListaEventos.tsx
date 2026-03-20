import CustomDatePicker from '@/components/CustomDatePicker';
import { DateSelector } from '@/components/DataSelector';
import { EventItem } from '@/components/EventItem';
import EventsInfo from '@/components/Modal/Info/EventsInfo';
import { ReadMoreModal } from '@/components/Modal/ModalVerbete';
import { Evento, MOCK_EVENTOS } from '@/data/mocksEvents';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function EventCalendarList() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Evento | null>(null);

  // Lógica de filtragem encapsulada
  const eventosDoDia = MOCK_EVENTOS.filter((evento) => {
    const dataSelecionadaStr = selectedDate.toISOString().split('T')[0];
    return evento.data === dataSelecionadaStr;
  });

  return (
    <View style={styles.eventContainer}>
      {/* Seleção de Data */}
      <DateSelector
        currentDate={selectedDate}
        onDateChange={(newDate) => setSelectedDate(newDate)}
        onOpenPicker={() => setShowDatePicker(true)}
      />

      {/* Lista de Eventos */}
      <View style={styles.eventList}>
        {eventosDoDia.length > 0 ? (
          eventosDoDia.map((evento) => (
            <EventItem
              key={evento.id}
              title={evento.nome}
              onPress={() => setSelectedEvent(evento)}
            />
          ))
        ) : (
          <Text style={styles.emptyStateText}>Nenhum evento programado para esta data.</Text>
        )}
      </View>

      {/* Seletor de Data (Calendário Modal) */}
      <CustomDatePicker
        visible={showDatePicker}
        selectedDate={selectedDate}
        onClose={() => setShowDatePicker(false)}
        onSelectDate={(date) => {
          setSelectedDate(date);
          setShowDatePicker(false);
        }}
      />

      {/* Detalhes do Evento selecionado */}
      <ReadMoreModal
        visible={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.nome || ''}
      >
        {selectedEvent ? (
          <EventsInfo
            location={`${selectedEvent.rua}, ${selectedEvent.bairro} - ${selectedEvent.cidade}`}
            date={`${selectedEvent.data.split('-').reverse().join('/')} às ${selectedEvent.horario}`}
            description={selectedEvent.descricao}
          />
        ) : <></>}
      </ReadMoreModal>
    </View>
  );
}

const styles = StyleSheet.create({
  eventContainer: {
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 24,
    gap: 24,
    marginTop: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Opacidade leve para combinar com gradientes
  },
  eventList: {
    gap: 8,
  },
  emptyStateText: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 10
  }
});