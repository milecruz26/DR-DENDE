import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DateSelectorProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onOpenPicker: () => void;
}

export const DateSelector = ({ currentDate, onDateChange, onOpenPicker }: DateSelectorProps) => {
  // Função para formatar a data (Ex: 25/Dez)
  if (!currentDate) {
    return (
      <View style={styles.dateSelectorRow}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  const formatDate = (date: Date) => {
    // Garante que é um objeto Date válido antes de formatar
    if (!(date instanceof Date) || isNaN(date.getTime())) return '--/--';
    const months = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];
    return `${date.getDate().toString().padStart(2, '0')}/${months[date.getMonth()]}`;
  };

  const getOffsetDate = (offset: number) => {
    // 2. Proteção extra dentro da função de cálculo
    const baseDate = currentDate instanceof Date ? currentDate : new Date();
    const newDate = new Date(baseDate);
    newDate.setDate(baseDate.getDate() + offset);
    return newDate;
  };

  const yesterday = getOffsetDate(-1);
  const tomorrow = getOffsetDate(1);

  return (
    <View style={styles.dateSelectorRow}>
      {/* Seta Esquerda (Volta 1 dia) */}
      <TouchableOpacity style={styles.arrowButton} onPress={() => onDateChange(yesterday)}>
        <Feather name="chevron-left" size={24} color={'#2F4F2F'} />
      </TouchableOpacity>

      {/* Data Anterior */}
      <TouchableOpacity style={styles.dateItem} onPress={() => onDateChange(yesterday)}>
        <Text style={styles.dateText}>{formatDate(yesterday)}</Text>
      </TouchableOpacity>

      {/* Data Selecionada (Abre o Modal) */}
      <TouchableOpacity style={[styles.dateItem, styles.dateItemSelected]} onPress={onOpenPicker}>
        <Text style={[styles.dateText, styles.dateTextSelected]}>{formatDate(currentDate)}</Text>
      </TouchableOpacity>

      {/* Próxima Data */}
      <TouchableOpacity style={styles.dateItem} onPress={() => onDateChange(tomorrow)}>
        <Text style={styles.dateText}>{formatDate(tomorrow)}</Text>
      </TouchableOpacity>

      {/* Seta Direita (Avança 1 dia) */}
      <TouchableOpacity style={styles.arrowButton} onPress={() => onDateChange(tomorrow)}>
        <Feather name="chevron-right" size={24} color={'#2F4F2F'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dateSelectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    padding: 10,
  },
  arrowButton: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    backgroundColor: '#FDFDFD',
  },
  dateItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  dateItemSelected: {
    backgroundColor: '#2F4F2F',
  },
  dateText: {
    color: '#2F4F2F',
    fontWeight: '500',
  },
  dateTextSelected: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
