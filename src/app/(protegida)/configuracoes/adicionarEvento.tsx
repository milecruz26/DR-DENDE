import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import CustomDatePicker from '@/components/CustomDatePicker';
import { useAdicionarEvento } from '@/hooks/useAddEventos';

const COLORS = {
  primary: '#34523B',
  white: '#FFFFFF',
  textDark: '#333333',
  textLight: '#666666',
  border: '#CCCCCC',
  placeholder: '#888888',
  danger: '#D32F2F',
  orange: '#E67E22',
};

const CAPITAIS = [
  'Aracaju - SE',
  'Belém - PA',
  'Belo Horizonte - MG',
  'Boa Vista - RR',
  'Brasília - DF',
  'Campo Grande - MS',
  'Cuiabá - MT',
  'Curitiba - PR',
  'Florianópolis - SC',
  'Fortaleza - CE',
  'Goiânia - GO',
  'João Pessoa - PB',
  'Macapá - AP',
  'Maceió - AL',
  'Manaus - AM',
  'Natal - RN',
  'Palmas - TO',
  'Porto Alegre - RS',
  'Porto Velho - RO',
  'Recife - PE',
  'Rio Branco - AC',
  'Rio de Janeiro - RJ',
  'Salvador - BA',
  'São Luís - MA',
  'São Paulo - SP',
  'Teresina - PI',
  'Vitória - ES',
];

export default function AdicionarEvento() {
  const router = useRouter();
  const { states, actions } = useAdicionarEvento();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.root}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adicionar Evento</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* --- SEÇÃO DETALHES --- */}
        <View style={styles.sectionHeader}>
          <Feather name="calendar" size={20} color={COLORS.textDark} />
          <Text style={styles.sectionTitle}>Detalhes</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <Text style={styles.required}>*</Text> Nome
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Feijoada"
            value={states.nome}
            onChangeText={actions.setNome}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <Text style={styles.required}>*</Text> Data
          </Text>
          <TouchableOpacity
            style={styles.selectInput}
            onPress={() => actions.setShowDatePicker(true)}
          >
            <Text style={[styles.selectText, states.dataSelecionada && { color: COLORS.textDark }]}>
              {states.dataSelecionada
                ? states.dataSelecionada.toLocaleDateString('pt-BR')
                : 'Selecione uma data'}
            </Text>
            <Feather name="calendar" size={20} color={COLORS.orange} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <Text style={styles.required}>*</Text> Horário
          </Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.inputFlex}
              placeholder="Ex: 14:30"
              keyboardType="numeric"
              maxLength={5}
              value={states.horario}
              onChangeText={actions.handleHorarioChange}
            />
            <Feather name="clock" size={20} color={COLORS.orange} />
          </View>
        </View>

        {/* --- SEÇÃO DESCRIÇÃO --- */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <Text style={styles.required}>*</Text> Descrição
          </Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Sobre o evento..."
            multiline
            value={states.descricao}
            onChangeText={actions.setDescricao}
          />
        </View>

        {/* --- SEÇÃO LOCALIZAÇÃO --- */}
        <View style={[styles.sectionHeader, { marginTop: 10 }]}>
          <Feather name="map-pin" size={20} color={COLORS.textDark} />
          <Text style={styles.sectionTitle}>Localização</Text>
        </View>

        {/* INPUT DE CIDADE ATUALIZADO */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <Text style={styles.required}>*</Text> Cidade
          </Text>
          <TouchableOpacity
            style={styles.selectInput}
            onPress={() => actions.setShowCityPicker(true)}
          >
            <Text style={[styles.selectText, states.cidade && { color: COLORS.textDark }]}>
              {states.cidade || 'Selecione a capital'}
            </Text>
            <Feather name="chevron-down" size={20} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <Text style={styles.required}>*</Text> CEP
          </Text>
          <TextInput
            style={styles.input}
            placeholder="00000-000"
            keyboardType="numeric"
            value={states.cep}
            onChangeText={actions.handleCepChange}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <Text style={styles.required}>*</Text> Rua
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Rua das Mangueiras"
            value={states.rua}
            onChangeText={actions.setRua}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <Text style={styles.required}>*</Text> Bairro
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Rio Vermelho"
            value={states.bairro}
            onChangeText={actions.setBairro}
          />
        </View>

        <TouchableOpacity style={styles.btnPrimary} onPress={actions.handleSalvarEvento}>
          <Text style={styles.btnPrimaryText}>Adicionar evento</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* MODAL DE SELEÇÃO DE CIDADES */}
      <Modal visible={states.showCityPicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.cityPickerContainer}>
            <View style={styles.cityPickerHeader}>
              <Text style={styles.cityPickerTitle}>Selecione a Capital</Text>
              <TouchableOpacity onPress={() => actions.setShowCityPicker(false)}>
                <Feather name="x" size={24} color={COLORS.textDark} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={CAPITAIS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.cityItem}
                  onPress={() => {
                    actions.setCidade(item);
                    actions.setShowCityPicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.cityItemText,
                      states.cidade === item && { color: COLORS.orange, fontWeight: 'bold' },
                    ]}
                  >
                    {item}
                  </Text>
                  {states.cidade === item && (
                    <Feather name="check" size={18} color={COLORS.orange} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      <CustomDatePicker
        visible={states.showDatePicker}
        selectedDate={states.dataSelecionada}
        onClose={() => actions.setShowDatePicker(false)}
        onSelectDate={actions.setDataSelecionada}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  backText: { color: COLORS.primary, fontSize: 16, fontWeight: '500' },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginRight: 60,
  },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textDark },
  inputGroup: { marginBottom: 18 },
  label: { fontSize: 14, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 8 },
  required: { color: COLORS.danger },
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: COLORS.textDark,
    backgroundColor: COLORS.white,
  },
  selectInput: {
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  selectText: { fontSize: 16, color: COLORS.placeholder },
  inputWithIcon: {
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  inputFlex: { flex: 1, fontSize: 16, color: COLORS.textDark, height: '100%' },
  btnPrimary: {
    backgroundColor: COLORS.primary,
    height: 55,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  btnPrimaryText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },

  // Estilos do Modal de Cidade
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  cityPickerContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '70%',
    padding: 20,
  },
  cityPickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  cityPickerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textDark },
  cityItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cityItemText: { fontSize: 16, color: COLORS.textDark },
});
