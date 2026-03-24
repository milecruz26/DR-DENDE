import { InputField } from '@/components/InputField/InputField';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const COLORS = {
  primary: '#34523B',
  textDark: '#333',
  textLight: '#666',
  border: '#DDD',
  white: '#FFF',
  placeholder: '#999',
  error: '#C62828'
};

export default function EditarEstabelecimento() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Estados do formulário - Step 1 & 3
  const [form, setForm] = useState({
    nome: 'Usuário',
    email: 'user@email.com.br',
    telefone: '(71) 00000-0000',
    cnpj: '(71) 00000-0000',
    valorMin: 'R$ 00,00',
    valorMax: 'R$ 00,00',
    habilitarCupom: true,
    porcentagemCupom: '',
    usosPorUsuario: '01',
    instagram: 'instagram.com.br/exemplo',
    facebook: 'instagram.com.br/exemplo',
    youtube: 'instagram.com.br/exemplo',
    linkedin: 'instagram.com.br/exemplo',
  });

  // Estados do formulário - Step 2 (Horários)
  const [horarios, setHorarios] = useState([
    { id: '1', dia: 'Domingo', abre: '00:00', fecha: '00:00' },
    { id: '2', dia: 'Segunda', abre: '00:00', fecha: '00:00' },
    { id: '3', dia: 'Terça', abre: '00:00', fecha: '00:00' },
    { id: '4', dia: 'Quarta', abre: '00:00', fecha: '00:00' },
    { id: '5', dia: 'Quinta', abre: '00:00', fecha: '00:00' },
    { id: '6', dia: 'Sexta', abre: '00:00', fecha: '00:00' },
    { id: '7', dia: 'Sábado', abre: '00:00', fecha: '00:00' },
  ]);

  const handleHorarioChange = (index: number, campo: 'abre' | 'fecha', valor: string) => {
    const novosHorarios = [...horarios];
    novosHorarios[index][campo] = valor;
    setHorarios(novosHorarios);
  };

  const handleSave = () => {
    // Lógica para salvar os dados
    router.back();
  };

  const renderStep1 = () => (
    <View style={styles.formContainer}>
      <View style={styles.sectionHeader}>
        <Feather name="edit-3" size={20} color={COLORS.textDark} />
        <Text style={styles.sectionTitle}>Detalhes</Text>
      </View>

      <InputField label="Nome" value={form.nome} onChangeText={(item: string) => setForm({ ...form, nome: item })} required />
      <InputField label="Email" value={form.email} onChangeText={(item: string) => setForm({ ...form, email: item })} required keyboardType="email-address" />
      <InputField label="Número" value={form.telefone} onChangeText={(item: string) => setForm({ ...form, telefone: item })} required keyboardType="phone-pad" />
      <InputField label="CNPJ" value={form.cnpj} onChangeText={(item: string) => setForm({ ...form, cnpj: item })} required />

      <Text style={styles.label}><Text style={{ color: 'red' }}>*</Text> Foto do estabelecimento</Text>
      <TouchableOpacity style={styles.uploadBtn}>
        <Feather name="upload" size={20} color={COLORS.textLight} />
        <Text style={styles.uploadText}>Clique para selecionar uma imagem</Text>
      </TouchableOpacity>

      <Text style={styles.label}><Text style={{ color: 'red' }}>*</Text> Marca do estabelecimento</Text>
      <TouchableOpacity style={styles.uploadBtn}>
        <Feather name="upload" size={20} color={COLORS.textLight} />
        <Text style={styles.uploadText}>Clique para selecionar uma imagem</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <InputField label="Valor mínimo" value={form.valorMin} onChangeText={(item: string) => setForm({ ...form, valorMin: item })} required />
        </View>
        <View style={{ width: 15 }} />
        <View style={{ flex: 1 }}>
          <InputField label="Valor máximo" value={form.valorMax} onChangeText={(item: string) => setForm({ ...form, valorMax: item })} required />
        </View>
      </View>

      <View style={styles.footerBtns}>
        <TouchableOpacity style={styles.btnSecondary} onPress={() => setStep(2)}>
          <Text style={styles.btnSecondaryText}>Pular</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPrimary} onPress={() => setStep(2)}>
          <Text style={styles.btnPrimaryText}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.formContainer}>
      <View style={styles.sectionHeader}>
        <Feather name="clock" size={20} color={COLORS.textDark} />
        <Text style={styles.sectionTitle}>Horário de funcionamento</Text>
      </View>

      {horarios.map((item, index) => (
        <View key={item.id} style={styles.horarioRow}>
          <Text style={styles.diaText}>{item.dia}</Text>
          <View style={styles.horarioInputs}>
            <TextInput
              style={styles.timeInput}
              value={item.abre}
              onChangeText={(val) => handleHorarioChange(index, 'abre', val)}
              keyboardType="numeric"
            />
            <Text style={styles.timeSeparator}>-</Text>
            <TextInput
              style={styles.timeInput}
              value={item.fecha}
              onChangeText={(val) => handleHorarioChange(index, 'fecha', val)}
              keyboardType="numeric"
            />
          </View>
        </View>
      ))}

      <View style={styles.footerBtns}>
        <TouchableOpacity style={styles.btnSecondary} onPress={() => setStep(3)}>
          <Text style={styles.btnSecondaryText}>Pular</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPrimary} onPress={() => setStep(3)}>
          <Text style={styles.btnPrimaryText}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.formContainer}>
      <View style={styles.sectionHeader}>
        <Feather name="map-pin" size={20} color={COLORS.textDark} />
        <Text style={styles.sectionTitle}>Promocional</Text>
      </View>

      <Text style={styles.label}>
        <Text style={{ color: 'red' }}>*</Text> Habilitar cupom de desconto <Feather name="info" size={14} />
      </Text>

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setForm({ ...form, habilitarCupom: !form.habilitarCupom })}
      >
        <View style={[styles.checkbox, form.habilitarCupom && styles.checkboxActive]}>
          {form.habilitarCupom && <Feather name="check" size={16} color="#FFF" />}
        </View>
        <Text style={styles.checkboxLabel}>Habilitar cupom para usuários</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <InputField label="Porcentagem do Cupom" placeholder="%" value={form.porcentagemCupom} onChangeText={(item: string) => setForm({ ...form, porcentagemCupom: item })} required />
        </View>
        <View style={{ width: 15 }} />
        <View style={{ flex: 1 }}>
          <InputField label="Usos por usuários" value={form.usosPorUsuario} onChangeText={(item: string) => setForm({ ...form, usosPorUsuario: item })} required />
        </View>
      </View>

      <View style={[styles.sectionHeader, { marginTop: 20 }]}>
        <Feather name="share-2" size={20} color={COLORS.textDark} />
        <Text style={styles.sectionTitle}>Redes sociais</Text>
      </View>

      <InputField label="Instagram" value={form.instagram} onChangeText={(item: string) => setForm({ ...form, instagram: item })} required />
      <InputField label="Facebook" value={form.facebook} onChangeText={(item: string) => setForm({ ...form, facebook: item })} required />
      <InputField label="Youtube" value={form.youtube} onChangeText={(item: string) => setForm({ ...form, youtube: item })} required />
      <InputField label="Linkedin" value={form.linkedin} onChangeText={(item: string) => setForm({ ...form, linkedin: item })} required />

      <TouchableOpacity style={[styles.btnPrimary, { width: '100%', marginTop: 20 }]} onPress={handleSave}>
        <Text style={styles.btnPrimaryText}>Salvar alterações</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (step === 1) router.back();
            else setStep(step - 1);
          }}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back-outline" size={24} color={COLORS.primary} />
          <Text style={styles.backBtnText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar estabelecimento</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Componente auxiliar de Input
// export const InputField = ({ label, required, ...props }: any) => (
//   <View style={styles.inputGroup}>
//     <Text style={styles.label}>
//       {required && <Text style={{ color: 'red' }}>*</Text>} {label}
//     </Text>
//     <TextInput style={styles.input} placeholderTextColor={COLORS.placeholder} {...props} />
//   </View>
// );

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  backBtnText: { color: COLORS.primary, fontSize: 16 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: COLORS.textDark, marginRight: 50 },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  formContainer: { marginTop: 10 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textDark },

  // inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 8 },
  // input: {
  //   height: 55,
  //   borderWidth: 1,
  //   borderColor: COLORS.border,
  //   borderRadius: 10,
  //   paddingHorizontal: 15,
  //   fontSize: 16,
  //   color: COLORS.textLight
  // },

  uploadBtn: {
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#F9F9F9',
    marginBottom: 20
  },
  uploadText: { color: COLORS.textLight, fontSize: 14 },

  row: { flexDirection: 'row', justifyContent: 'space-between' },

  // Estilos específicos para o Step 2 (Horários)
  horarioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  diaText: {
    fontSize: 16,
    color: COLORS.textDark,
    fontWeight: '500',
    flex: 1,
  },
  horarioInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  timeInput: {
    width: 80,
    height: 45,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.textDark,
  },
  timeSeparator: {
    fontSize: 16,
    color: COLORS.textDark,
    fontWeight: 'bold',
  },

  checkboxContainer: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20, marginTop: 5 },
  checkbox: { width: 24, height: 24, borderRadius: 4, borderWidth: 2, borderColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  checkboxActive: { backgroundColor: COLORS.primary },
  checkboxLabel: { fontSize: 16, color: COLORS.textDark },

  footerBtns: { flexDirection: 'row', gap: 15, marginTop: 20 },
  btnPrimary: { flex: 1, height: 55, backgroundColor: COLORS.primary, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  btnPrimaryText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  btnSecondary: { flex: 1, height: 55, borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  btnSecondaryText: { color: COLORS.textDark, fontSize: 16, fontWeight: '500' },
});