import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Idealmente essas cores viriam de um arquivo de tema centralizado (ex: theme.ts)
const COLORS = {
  white: '#FFFFFF',
  textDark: '#333333',
  placeholder: '#888888',
  border: '#CCCCCC',
  orange: '#E67E22',
  calendarBg: '#FFFFFF',
};

const MESES_CURTO = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
];
const DIAS_SEMANA = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

interface CustomDatePickerProps {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
}

export default function CustomDatePicker({ visible, onClose, onSelectDate, selectedDate }: CustomDatePickerProps) {
  const [dataVisualizacao, setDataVisualizacao] = useState(new Date());
  const [modoCalendario, setModoCalendario] = useState<'dias' | 'meses' | 'anos'>('dias');

  // Sincroniza a visualização com a data selecionada caso ela exista
  useEffect(() => {
    if (visible && selectedDate) {
      setDataVisualizacao(new Date(selectedDate));
      setModoCalendario('dias');
    }
  }, [visible, selectedDate]);

  const navegarCalendario = (direcao: number) => {
    if (modoCalendario === 'dias') {
      setDataVisualizacao(new Date(dataVisualizacao.getFullYear(), dataVisualizacao.getMonth() + direcao, 1));
    } else if (modoCalendario === 'meses') {
      setDataVisualizacao(new Date(dataVisualizacao.getFullYear() + direcao, dataVisualizacao.getMonth(), 1));
    } else if (modoCalendario === 'anos') {
      setDataVisualizacao(new Date(dataVisualizacao.getFullYear() + (direcao * 9), dataVisualizacao.getMonth(), 1));
    }
  };

  const alternarModoCalendario = () => {
    if (modoCalendario === 'dias') setModoCalendario('anos');
    else if (modoCalendario === 'meses') setModoCalendario('anos');
    else setModoCalendario('dias');
  };

  const selecionarAno = (ano: number) => {
    setDataVisualizacao(new Date(ano, dataVisualizacao.getMonth(), 1));
    setModoCalendario('meses');
  };

  const selecionarMes = (mesIndex: number) => {
    setDataVisualizacao(new Date(dataVisualizacao.getFullYear(), mesIndex, 1));
    setModoCalendario('dias');
  };

  const selecionarDataLocal = (dia: number) => {
    const novaData = new Date(dataVisualizacao.getFullYear(), dataVisualizacao.getMonth(), dia);
    onSelectDate(novaData);
    onClose();
    setTimeout(() => setModoCalendario('dias'), 300);
  };

  const obterTituloCabecalho = () => {
    if (modoCalendario === 'dias') return `${MESES_CURTO[dataVisualizacao.getMonth()]} ${dataVisualizacao.getFullYear()}`;
    if (modoCalendario === 'meses') return `${dataVisualizacao.getFullYear()}`;
    if (modoCalendario === 'anos') {
      const anoFinal = dataVisualizacao.getFullYear();
      const anoInicial = anoFinal - 8;
      return `${anoInicial} - ${anoFinal}`;
    }
  };

  const renderizarDias = () => {
    const ano = dataVisualizacao.getFullYear();
    const mes = dataVisualizacao.getMonth();
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();
    const primeiroDiaMes = new Date(ano, mes, 1).getDay();
    const espacosVaziosInicio = primeiroDiaMes === 0 ? 6 : primeiroDiaMes - 1;

    const dias = [];
    for (let i = 0; i < espacosVaziosInicio; i++) {
      dias.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    for (let i = 1; i <= diasNoMes; i++) {
      const isSelected = selectedDate &&
        selectedDate?.getDate() === i &&
        selectedDate?.getMonth() === mes &&
        selectedDate?.getFullYear() === ano;

      dias.push(
        <TouchableOpacity
          key={`day-${i}`}
          style={[styles.dayCell, isSelected && styles.itemSelected]}
          onPress={() => selecionarDataLocal(i)}
        >
          <Text style={[styles.dayText, isSelected && styles.textSelected]}>{i}</Text>
        </TouchableOpacity>
      );
    }
    return <View style={styles.daysGrid}>{dias}</View>;
  };

  const renderizarMeses = () => {
    return (
      <View style={styles.gridContainer}>
        {MESES_CURTO.map((mes, index) => {
          const isSelected = selectedDate?.getMonth() === index && selectedDate?.getFullYear() === dataVisualizacao.getFullYear();
          return (
            <TouchableOpacity key={`month-${index}`} style={[styles.gridCell, isSelected && styles.itemSelected]} onPress={() => selecionarMes(index)}>
              <Text style={[styles.gridText, isSelected && styles.textSelected]}>{mes}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderizarAnos = () => {
    const anos = [];
    const anoFinal = dataVisualizacao.getFullYear();
    const anoInicial = anoFinal - 8;

    for (let ano = anoInicial; ano <= anoFinal; ano++) {
      const isSelected = selectedDate?.getFullYear() === ano;
      anos.push(
        <TouchableOpacity key={`year-${ano}`} style={[styles.gridCell, isSelected && styles.itemSelected]} onPress={() => selecionarAno(ano)}>
          <Text style={[styles.gridText, isSelected && styles.textSelected]}>{ano}</Text>
        </TouchableOpacity>
      );
    }
    return <View style={styles.gridContainer}>{anos}</View>;
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.calendarContainer} onStartShouldSetResponder={() => true}>

          <View style={styles.calendarHeader}>
            <TouchableOpacity style={styles.navButton} onPress={() => navegarCalendario(-1)}>
              <Feather name="chevron-left" size={20} color={COLORS.textDark} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.monthSelector} onPress={alternarModoCalendario}>
              <Text style={styles.monthText}>{obterTituloCabecalho()}</Text>
              <Feather name={modoCalendario === 'dias' ? "chevron-down" : "chevron-up"} size={16} color={COLORS.textDark} style={{ marginLeft: 6 }} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton} onPress={() => navegarCalendario(1)}>
              <Feather name="chevron-right" size={20} color={COLORS.textDark} />
            </TouchableOpacity>
          </View>

          {modoCalendario === 'dias' && (
            <View style={styles.weekDaysRow}>
              {DIAS_SEMANA.map((dia, index) => (
                <Text key={index} style={styles.weekDayText}>{dia}</Text>
              ))}
            </View>
          )}

          {modoCalendario === 'dias' && renderizarDias()}
          {modoCalendario === 'meses' && renderizarMeses()}
          {modoCalendario === 'anos' && renderizarAnos()}

        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  calendarContainer: { backgroundColor: COLORS.calendarBg, borderRadius: 16, padding: 20, width: '100%', maxWidth: 360, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 8 },
  calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  navButton: { width: 40, height: 40, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border, justifyContent: 'center', alignItems: 'center' },
  monthSelector: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  monthText: { fontSize: 16, fontWeight: 'bold', color: COLORS.textDark },
  weekDaysRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  weekDayText: { width: 40, textAlign: 'center', fontSize: 12, color: COLORS.placeholder, fontWeight: '500' },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10 },
  dayCell: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 8, borderRadius: 8 },
  gridCell: { width: '30%', height: 46, justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderRadius: 8 },
  dayText: { fontSize: 14, color: COLORS.textDark, fontWeight: '500' },
  gridText: { fontSize: 15, color: COLORS.textDark, fontWeight: '500' },
  itemSelected: { backgroundColor: COLORS.orange },
  textSelected: { color: COLORS.white, fontWeight: 'bold' },
});