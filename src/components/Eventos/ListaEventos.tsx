// components/Eventos/ListaEventos.tsx
import CustomDatePicker from '@/components/CustomDatePicker';
import { DateSelector } from '@/components/DataSelector';
import { EventItem } from '@/components/EventItem';
import { useAllEvents } from '@/hooks/useStaff';
import { Event } from '@/interfaces/event';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface EventCalendarListProps {
  onSelectEvent?: (event: Event) => void;
}

export default function EventCalendarList({ onSelectEvent }: EventCalendarListProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { data: eventos, isLoading, error } = useAllEvents();

  // Função para converter string ISO em objeto Date
  const parseEventDate = (dateStr: string): Date => {
    return new Date(dateStr);
  };

  // Função para formatar data e hora (ex: 20/05/2025 às 19:00)
  const formatDateTime = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} às ${hours}:${minutes}`;
  };

  // Filtra eventos do dia selecionado
  const eventosDoDia = eventos?.filter((evento) => {
    const dataEvento = new Date(evento.event_date);
    return dataEvento.toDateString() === selectedDate.toDateString();
  }) ?? [];

  if (isLoading) {
    return (
      <View style={styles.eventContainer}>
        <ActivityIndicator size="large" color="#E87C38" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.eventContainer}>
        <Text style={styles.emptyStateText}>Erro ao carregar eventos.</Text>
      </View>
    );
  }

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
              title={evento.name}
              onPress={() => onSelectEvent && onSelectEvent(evento)}
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
      {/* <ReadMoreModal
        visible={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.name || ''}
      >
        {selectedEvent ? (
          <EventsInfo
            location={`${selectedEvent.address.street}, ${selectedEvent.address.neighborhood} - ${selectedEvent.address.city}`}
            date={formatDateTime(selectedEvent.event_date)}
            description={selectedEvent.description}
          />
        ) : <></>}
      </ReadMoreModal> */}
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  eventList: {
    gap: 8,
  },
  emptyStateText: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 10,
  },
});