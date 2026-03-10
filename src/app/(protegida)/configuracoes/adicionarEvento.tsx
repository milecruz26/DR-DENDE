import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const COLORS = {
  primary: '#34523B',
  white: '#FFFFFF',
  textDark: '#333333',
  textLight: '#666666',
  border: '#CCCCCC',
  placeholder: '#888888',
  danger: '#D32F2F',
  orange: '#E67E22',
  orangeLight: '#FBE9E0',
  calendarBg: '#FFFFFF',
};

const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];
const MESES_CURTO = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
];
const DIAS_SEMANA = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

export default function AdicionarEvento() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');

  // Estados do Date Picker
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dataVisualizacao, setDataVisualizacao] = useState(new Date());
  const [modoCalendario, setModoCalendario] = useState<'dias' | 'meses' | 'anos'>('dias');

  // --- NAVEGAÇÃO DO CALENDÁRIO ---
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
    else setModoCalendario('dias'); // Volta se já estiver em anos
  };

  const selecionarAno = (ano: number) => {
    setDataVisualizacao(new Date(ano, dataVisualizacao.getMonth(), 1));
    setModoCalendario('meses');
  };

  const selecionarMes = (mesIndex: number) => {
    setDataVisualizacao(new Date(dataVisualizacao.getFullYear(), mesIndex, 1));
    setModoCalendario('dias');
  };

  const selecionarData = (dia: number) => {
    const novaData = new Date(dataVisualizacao.getFullYear(), dataVisualizacao.getMonth(), dia);
    setDataSelecionada(novaData);
    setShowDatePicker(false);
    // Reseta o modo para a próxima vez que abrir
    setTimeout(() => setModoCalendario('dias'), 300);
  };

  // --- RENDERIZADORES ---
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
      const isSelected = dataSelecionada &&
        dataSelecionada.getDate() === i &&
        dataSelecionada.getMonth() === mes &&
        dataSelecionada.getFullYear() === ano;

      dias.push(
        <TouchableOpacity
          key={`day-${i}`}
          style={[styles.dayCell, isSelected && styles.itemSelected]}
          onPress={() => selecionarData(i)}
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
          const isSelected = dataSelecionada?.getMonth() === index && dataSelecionada?.getFullYear() === dataVisualizacao.getFullYear();
          return (
            <TouchableOpacity
              key={`month-${index}`}
              style={[styles.gridCell, isSelected && styles.itemSelected]}
              onPress={() => selecionarMes(index)}
            >
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
    const anoInicial = anoFinal - 8; // Últimos 9 anos (ex: 2018 a 2026)

    for (let ano = anoInicial; ano <= anoFinal; ano++) {
      const isSelected = dataSelecionada?.getFullYear() === ano;
      anos.push(
        <TouchableOpacity
          key={`year-${ano}`}
          style={[styles.gridCell, isSelected && styles.itemSelected]}
          onPress={() => selecionarAno(ano)}
        >
          <Text style={[styles.gridText, isSelected && styles.textSelected]}>{ano}</Text>
        </TouchableOpacity>
      );
    }
    return <View style={styles.gridContainer}>{anos}</View>;
  };

  const formatarData = (data: Date | null) => {
    if (!data) return 'Selecione uma data';
    return data.toLocaleDateString('pt-BR');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adicionar Evento</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Feather name="calendar" size={20} color={COLORS.textDark} />
          <Text style={styles.sectionTitle}>Detalhes</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}><Text style={styles.required}>*</Text> Nome</Text>
          <TextInput style={styles.input} placeholder="Ex: Feijoada" placeholderTextColor={COLORS.placeholder} value={nome} onChangeText={setNome} />
        </View>

        {/* CAMPO DE DATA */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}><Text style={styles.required}>*</Text> Data</Text>
          <TouchableOpacity style={[styles.selectInput, showDatePicker && { borderColor: COLORS.orange }]} onPress={() => setShowDatePicker(true)}>
            <Text style={[styles.selectText, dataSelecionada && { color: COLORS.textDark }]}>
              {formatarData(dataSelecionada)}
            </Text>
            <Feather name="calendar" size={20} color={dataSelecionada ? COLORS.orange : COLORS.textLight} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}><Text style={styles.required}>*</Text> Descrição do evento</Text>
          <View style={styles.textAreaContainer}>
            <TextInput style={styles.textArea} placeholder="Descrição do prato" placeholderTextColor={COLORS.placeholder} value={descricao} onChangeText={setDescricao} multiline maxLength={120} textAlignVertical="top" />
            <View style={styles.textAreaFooter}>
              <Text style={styles.charCount}>{descricao.length}/120</Text>
              <Feather name="menu" size={12} color={COLORS.placeholder} style={{ transform: [{ rotate: '45deg' }] }} />
            </View>
          </View>
        </View>

        <View style={[styles.sectionHeader, { marginTop: 10 }]}>
          <Feather name="map-pin" size={20} color={COLORS.textDark} />
          <Text style={styles.sectionTitle}>Localização</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}><Text style={styles.required}>*</Text> Cidade</Text>
          <TouchableOpacity style={styles.selectInput}>
            <Text style={styles.selectText}>Ex: Salvador – BA</Text>
            <Feather name="chevron-down" size={20} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}><Text style={styles.required}>*</Text> CEP</Text>
          <TextInput style={styles.input} placeholder="Ex: 00000-000" placeholderTextColor={COLORS.placeholder} keyboardType="numeric" value={cep} onChangeText={setCep} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}><Text style={styles.required}>*</Text> Rua</Text>
          <TextInput style={styles.input} placeholder="Ex: Rua das Mangueiras, nº 1287" placeholderTextColor={COLORS.placeholder} value={rua} onChangeText={setRua} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}><Text style={styles.required}>*</Text> Bairro</Text>
          <TextInput style={styles.input} placeholder="Ex: Bairro Rio Vermelho, Salvador" placeholderTextColor={COLORS.placeholder} value={bairro} onChangeText={setBairro} />
        </View>

        <TouchableOpacity style={styles.btnPrimary} onPress={() => router.back()}>
          <Text style={styles.btnPrimaryText}>Adicionar evento</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* MODAL DO DATE PICKER CUSTOMIZADO */}
      <Modal visible={showDatePicker} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowDatePicker(false)}>
          <View style={styles.calendarContainer} onStartShouldSetResponder={() => true}>

            {/* Header Dinâmico */}
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

            {/* Dias da Semana (Só aparece no modo dias) */}
            {modoCalendario === 'dias' && (
              <View style={styles.weekDaysRow}>
                {DIAS_SEMANA.map((dia, index) => (
                  <Text key={index} style={styles.weekDayText}>{dia}</Text>
                ))}
              </View>
            )}

            {/* Conteúdo Dinâmico (Dias, Meses ou Anos) */}
            {modoCalendario === 'dias' && renderizarDias()}
            {modoCalendario === 'meses' && renderizarMeses()}
            {modoCalendario === 'anos' && renderizarAnos()}

          </View>
        </TouchableOpacity>
      </Modal>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20 },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  backText: { color: COLORS.primary, fontSize: 16, fontWeight: '500' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: COLORS.textDark, marginRight: 60 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20, marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textDark },
  inputGroup: { marginBottom: 18 },
  label: { fontSize: 14, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 8 },
  required: { color: COLORS.danger },
  input: { height: 55, borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, paddingHorizontal: 15, fontSize: 16, color: COLORS.textDark, backgroundColor: COLORS.white },
  selectInput: { height: 55, borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.white },
  selectText: { fontSize: 16, color: COLORS.placeholder },
  textAreaContainer: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, backgroundColor: COLORS.white, padding: 15, height: 120 },
  textArea: { flex: 1, fontSize: 16, color: COLORS.textDark },
  textAreaFooter: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 5, marginTop: 5 },
  charCount: { fontSize: 12, color: COLORS.placeholder },
  btnPrimary: { backgroundColor: COLORS.primary, height: 55, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 },
  btnPrimaryText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },

  // --- ESTILOS DO DATE PICKER ---
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  calendarContainer: { backgroundColor: COLORS.calendarBg, borderRadius: 16, padding: 20, width: '100%', maxWidth: 360, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 8 },
  calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  navButton: { width: 40, height: 40, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border, justifyContent: 'center', alignItems: 'center' },
  monthSelector: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  monthText: { fontSize: 16, fontWeight: 'bold', color: COLORS.textDark },
  weekDaysRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  weekDayText: { width: 40, textAlign: 'center', fontSize: 12, color: COLORS.placeholder, fontWeight: '500' },

  // Grids
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10 },

  // Cells
  dayCell: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 8, borderRadius: 8 },
  gridCell: { width: '30%', height: 46, justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderRadius: 8 },

  // Text
  dayText: { fontSize: 14, color: COLORS.textDark, fontWeight: '500' },
  gridText: { fontSize: 15, color: COLORS.textDark, fontWeight: '500' },

  // Selected State (Orange)
  itemSelected: { backgroundColor: COLORS.orange },
  textSelected: { color: COLORS.white, fontWeight: 'bold' },
});