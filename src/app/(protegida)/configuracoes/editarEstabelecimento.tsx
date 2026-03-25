import ImageUploadField from '@/components/ImageUploadField';
import { InputField } from '@/components/InputField/InputField';
import { useEstablishmentUser, useUpdateEstablishmentUser } from '@/hooks/useEstablishment';
import { Feather, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
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
  const { data: establishment, isLoading: loadingEstablishment } = useEstablishmentUser();
  const updateMutation = useUpdateEstablishmentUser();

  // Estados do formulário - Step 1 & 3
  const [form, setForm] = useState<any>({
    nome: '',
    email: '',
    telefone: '',
    cnpj: '',
    logoImage: null as string | null,
    coverImage: null as string | null,
    valorMin: '',
    valorMax: '',
    habilitarCupom: false,
    porcentagemCupom: '',
    usosPorUsuario: '',
    instagram: '',
    facebook: '',
    youtube: '',
    linkedin: '',
  });
  const [horarios, setHorarios] = useState<any[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [currentField, setCurrentField] = useState<'abre' | 'fecha' | null>(null);
  const [tempDate, setTempDate] = useState(new Date());

  useEffect(() => {
    if (establishment) {
      setForm({
        nome: establishment.username || '',
        email: establishment.email || '',
        telefone: establishment.phone || '',
        cnpj: establishment.cnpj || '',
        logoImage: establishment.logo_image || null,
        coverImage: establishment.cover_image || null,
        valorMin: establishment.min_price?.toString() || '',
        valorMax: establishment.max_price?.toString() || '',
        habilitarCupom: establishment.coupon_enabled || false,
        porcentagemCupom: establishment.coupon_percentage?.toString() || '',
        usosPorUsuario: establishment.coupon_uses_per_user?.toString() || '1',
        instagram: establishment.social?.instagram || '',
        facebook: establishment.social?.facebook || '',
        youtube: establishment.social?.youtube || '',
        linkedin: establishment.social?.linkedin || '',
      });

      // Garante que opening_hours seja um array
      const hours = Array.isArray(establishment.opening_hours) ? establishment.opening_hours : [];
      setHorarios(hours.length ? hours : [
        { id: '1', dia: 'Dom', abre: '00:00', fecha: '00:00' },
        { id: '2', dia: 'Seg', abre: '00:00', fecha: '00:00' },
        { id: '3', dia: 'Ter', abre: '00:00', fecha: '00:00' },
        { id: '4', dia: 'Qua', abre: '00:00', fecha: '00:00' },
        { id: '5', dia: 'Qui', abre: '00:00', fecha: '00:00' },
        { id: '6', dia: 'Sex', abre: '00:00', fecha: '00:00' },
        { id: '7', dia: 'Sáb', abre: '00:00', fecha: '00:00' },
      ]);
    }
  }, [establishment]);

  const openTimePicker = (index: number, field: 'abre' | 'fecha') => {
    const currentTime = horarios[index][field];

    setTempDate(parseTimeToDate(currentTime));
    setCurrentIndex(index);
    setCurrentField(field);
    setShowPicker(true);
  };

  const parseTimeToDate = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours || 0);
    date.setMinutes(minutes || 0);
    date.setSeconds(0);
    return date;
  };

  const handleHorarioChange = (index: number, campo: 'abre' | 'fecha', valor: string) => {
    const novosHorarios = [...horarios];
    novosHorarios[index][campo] = valor;
    setHorarios(novosHorarios);
  };
  const handleTimeChange = (_: any, selectedDate?: Date) => {
    if (!selectedDate) return;

    setTempDate(selectedDate);

    if (Platform.OS === 'android') {
      setShowPicker(false);
    }

    if (currentIndex === null || !currentField) return;

    const hours = String(selectedDate.getHours()).padStart(2, '0');
    const minutes = String(selectedDate.getMinutes()).padStart(2, '0');

    handleHorarioChange(currentIndex, currentField, `${hours}:${minutes}`);
  };
  const confirmIOSPicker = () => {
    if (currentIndex === null || !currentField) return;

    const hours = String(tempDate.getHours()).padStart(2, '0');
    const minutes = String(tempDate.getMinutes()).padStart(2, '0');

    handleHorarioChange(currentIndex, currentField, `${hours}:${minutes}`);

    setShowPicker(false);
  };

  const pickImage = async (field: 'logoImage' | 'coverImage') => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Precisamos de permissão para acessar suas fotos!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) {
      setForm((prev: any) => ({ ...prev, [field]: result.assets[0].uri }));
    }
  };
  const handleSave = async () => {
    // Prepara os dados para envio (usaremos FormData para incluir imagens)
    const formData = new FormData();

    formData.append('username', form.nome);
    formData.append('email', form.email);
    formData.append('phone', form.telefone);
    formData.append('cnpj', form.cnpj);
    formData.append('min_price', form.valorMin.replace('R$ ', '').replace(',', '.'));
    formData.append('max_price', form.valorMax.replace('R$ ', '').replace(',', '.'));
    formData.append('coupon_enabled', String(form.habilitarCupom));
    if (form.habilitarCupom) {
      formData.append('coupon_percentage', form.porcentagemCupom);
      formData.append('coupon_uses_per_user', form.usosPorUsuario);
    }
    formData.append('social', JSON.stringify({
      instagram: form.instagram,
      facebook: form.facebook,
      youtube: form.youtube,
      linkedin: form.linkedin,
    }));
    formData.append('opening_hours', JSON.stringify(horarios.map(h => ({ day: h.dia, open: h.abre, close: h.fecha }))));

    // Adicionar imagens se houver
    if (form.logoImage && form.logoImage !== establishment?.logo_image) {
      const filename = form.logoImage.split('/').pop();
      const match = /\.(\w+)$/.exec(filename ?? '');
      const type = match ? `image/${match[1]}` : 'image/jpeg';
      formData.append('logo_image', {
        uri: form.logoImage,
        name: filename,
        type,
      } as any);
    }
    if (form.coverImage && form.coverImage !== establishment?.cover_image) {
      const filename = form.coverImage.split('/').pop();
      const match = /\.(\w+)$/.exec(filename ?? '');
      const type = match ? `image/${match[1]}` : 'image/jpeg';
      formData.append('cover_image', {
        uri: form.coverImage,
        name: filename,
        type,
      } as any);
    }

    try {
      await updateMutation.mutateAsync(formData);
      router.back();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar alterações');
    }
  };

  if (loadingEstablishment) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }


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

      <Text style={styles.label}><Text style={{ color: 'red' }}>*</Text> Foto do estabelecimento (capa)</Text>
      <ImageUploadField
        imageUri={form.coverImage}
        onPickImage={() => pickImage('coverImage')}
        onRemoveImage={() => setForm({ ...form, coverImage: null })}
      />

      <Text style={styles.label}><Text style={{ color: 'red' }}>*</Text> Marca do estabelecimento (logo)</Text>
      <ImageUploadField
        imageUri={form.logoImage}
        onPickImage={() => pickImage('logoImage')}
        onRemoveImage={() => setForm({ ...form, logoImage: null })}
      />

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
        <Text style={styles.sectionTitle}>Funcionamento</Text>
      </View>
      <Text style={styles.subTitle}>Horário de funcionamento:</Text>

      <View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: 40, }} />
          <View style={{ flexDirection: "row", width: "100%", gap: 25 }}>
            <Text style={styles.textHorario}>* Horário</Text>
            <Text style={styles.textHorario}>* Horário</Text>
          </View>
        </View>

        {Array.isArray(horarios) && horarios.map((item, index) => (
          <View key={item.id} style={styles.horarioRow}>
            <View style={{ width: 40 }}>
              <Text style={styles.diaText}>{item.dia}</Text>
            </View>


            <View style={styles.horarioInputs}>
              <TouchableOpacity
                style={styles.timeInput}
                onPress={() => openTimePicker(index, 'abre')}
              >
                <Text style={styles.timeText}>{item.abre}</Text>
              </TouchableOpacity>

              <Text style={styles.timeSeparator}>-</Text>

              <TouchableOpacity
                style={styles.timeInput}
                onPress={() => openTimePicker(index, 'fecha')}
              >
                <Text style={styles.timeText}>{item.fecha}</Text>
              </TouchableOpacity>
            </View>

          </View>
        ))}
      </View>

      {showPicker && Platform.OS === 'ios' && (
        <View style={styles.pickerContainer}>
          <View style={styles.pickerHeader}>
            <TouchableOpacity onPress={() => setShowPicker(false)}>
              <Text style={styles.pickerCancel}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={confirmIOSPicker}>
              <Text style={styles.pickerConfirm}>Confirmar</Text>
            </TouchableOpacity>
          </View>

          <DateTimePicker
            value={tempDate}
            mode="time"
            display="spinner"
            is24Hour
            onChange={handleTimeChange}
          />
        </View>
      )}
      {showPicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={tempDate}
          mode="time"
          is24Hour
          onChange={handleTimeChange}
        />
      )}
      <View style={styles.footerBtns}>
        <TouchableOpacity style={styles.btnSecondary} onPress={() => setStep(3)}>
          <Text style={styles.btnSecondaryText}>Pular</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPrimary} onPress={() => setStep(3)}>
          <Text style={styles.btnPrimaryText}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

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
          <InputField label="Porcentagem do Cupom" placeholder="%" value={form.porcentagemCupom} onChangeText={(item: string) => setForm({ ...form, porcentagemCupom: item })} required={form.habilitarCupom} />
        </View>
        <View style={{ flex: 1 }}>
          <InputField label="Usos por usuários" value={form.usosPorUsuario} onChangeText={(item: string) => setForm({ ...form, usosPorUsuario: item })} required={form.habilitarCupom} />
        </View>
      </View>

      <View style={[styles.sectionHeader, { marginTop: 20 }]}>
        <Feather name="share-2" size={20} color={COLORS.textDark} />
        <Text style={styles.sectionTitle}>Redes sociais</Text>
      </View>

      <InputField label="Instagram" value={form.instagram} onChangeText={(item: string) => setForm({ ...form, instagram: item })} />
      <InputField label="Facebook" value={form.facebook} onChangeText={(item: string) => setForm({ ...form, facebook: item })} />
      <InputField label="Youtube" value={form.youtube} onChangeText={(item: string) => setForm({ ...form, youtube: item })} />
      <InputField label="Linkedin" value={form.linkedin} onChangeText={(item: string) => setForm({ ...form, linkedin: item })} />

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
  subTitle: { fontSize: 16, color: COLORS.textDark, marginBottom: 16 },

  // inputGroup: { marginBottom: 15 },
  label: { fontSize: 12, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 8 },
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

  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 13 },

  // Estilos específicos para o Step 2 (Horários)
  textHorario: {
    fontSize: 12,
    fontWeight: "bold",
    minWidth: 148,
    marginBottom: 8
  },
  horarioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // gap: 10,
    marginBottom: 15,
    width: "auto",

  },
  diaText: {
    fontSize: 16,
    color: COLORS.textDark,
    fontWeight: '500',
    // flex: 1

  },
  horarioInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  timeInput: {
    minWidth: 148,
    height: 45,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.textDark,
    alignItems: "center",
    justifyContent: "center",

  },
  timeSeparator: {
    fontSize: 16,
    color: COLORS.textDark,
    fontWeight: 'bold',
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 6,
  },

  timeText: {
    fontSize: 16,
    color: COLORS.textDark,
  },

  pickerContainer: {
    backgroundColor: '#FFF',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 20,
  },

  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },

  pickerCancel: {
    color: '#999',
    fontSize: 16,
  },

  pickerConfirm: {
    color: COLORS.primary,
    fontSize: 16,
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