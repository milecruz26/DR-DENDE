import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
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
import ImageUploadField from '@/components/ImageUploadField';
import { useEntry } from '@/context/EntryContext';

const COLORS = {
  primary: '#34523B',
  white: '#FFFFFF',
  textDark: '#333333',
  textLight: '#666666',
  border: '#CCCCCC',
  placeholder: '#888888',
  danger: '#D32F2F',
  uploadBg: '#FAFAFA',
  recording: '#FF0000',
};

const CATEGORIAS = ['Entrada', 'Acompanhamentos', 'Sobremesas', 'Vegetarianas', 'Prato Principal'];

export default function AdicionarVerbetePasso1() {
  const router = useRouter();
  const { setData } = useEntry();

  // Estados do Form
  const [nome, setNome] = useState('');
  const [textoVerbete, setTextoVerbete] = useState('');
  const [tempo, setTempo] = useState('');
  const [categoria, setCategoria] = useState('Selecionar');
  const [showCatModal, setShowCatModal] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Estados de Áudio
  // const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  // const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // FUNÇÃO: Excluir Áudio
  async function handleDeleteAudio() {
    if (audioUri) {
      setAudioUri(null);
    }
  }

  const pickImage = async () => {
    // Solicita permissão
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Precisamos de permissão para acessar suas fotos!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const mapCategoria = (cat: string) => {
    const map = {
      Entrada: 'entradas',
      Acompanhamentos: 'acompanhamentos',
      Sobremesas: 'sobremesas',
      Vegetarianas: 'vegetarianas',
      'Prato Principal': 'prato_principal',
    };

    return map[cat as keyof typeof map] || 'entradas';
  };

  const handleNext = () => {
    setData({
      name: nome,
      picture: imageUri,
      audio: audioUri,
      entry_text: textoVerbete,
      category: mapCategoria(categoria),
      estimated_time: tempo,
      difficulty_level: 'facil', // temporário
    });

    router.push('/configuracoes/adicionarVerbetePasso2');
  };

  // Função para selecionar arquivo de áudio
  const handlePickAudio = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setAudioUri(result.assets[0].uri);
        Alert.alert('Sucesso', 'Arquivo de áudio selecionado!');
        console.log('Áudio selecionado:', audioUri);
      }
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível carregar o arquivo.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.root}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adicionar verbete</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Seção: Detalhes */}
        <View style={styles.sectionHeader}>
          <Feather name="book-open" size={22} color={COLORS.textDark} />
          <Text style={styles.sectionTitle}>Detalhes</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <Text style={styles.required}>*</Text> Nome
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Text"
            placeholderTextColor={COLORS.placeholder}
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <Text style={styles.required}>*</Text> Foto representativa
          </Text>
          <ImageUploadField
            imageUri={imageUri}
            onPickImage={pickImage}
            onRemoveImage={() => setImageUri(null)}
          />
        </View>

        {/* Campo de Áudio Atualizado */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <Text style={styles.required}>*</Text> Audio descrição do texto
          </Text>
          <TouchableOpacity style={styles.uploadArea} onPress={handlePickAudio}>
            <Feather
              name={audioUri ? 'check-circle' : 'upload'}
              size={20}
              color={audioUri ? COLORS.primary : COLORS.textLight}
            />
            <Text style={[styles.uploadText, audioUri && { color: COLORS.primary }]}>
              {audioUri ? 'Áudio selecionado' : 'Clique para selecionar um arquivo de áudio'}
            </Text>
            {audioUri && (
              <TouchableOpacity style={styles.deleteAudioSmall} onPress={handleDeleteAudio}>
                <Feather name="trash-2" size={20} color={COLORS.danger} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>

        {/* CAMPO DE ÁUDIO COM GRAVAÇÃO DIRETA */}
        {/* <View style={styles.inputGroup}>
          <Text style={styles.label}><Text style={styles.required}>*</Text> Audio descrição do texto</Text> */}

        {/* Botão de Gravação Principal */}
        {/* <TouchableOpacity
            style={[
              styles.uploadArea,
              isRecording && { borderColor: COLORS.recording, backgroundColor: '#FFF5F5' }
            ]}
            onPress={isRecording ? stopRecording : startRecording}
          >
            <Feather
              name={isRecording ? "mic-off" : "mic"}
              size={20}
              color={isRecording ? COLORS.recording : COLORS.textLight}
            />
            <Text style={[styles.uploadText, isRecording && { color: COLORS.recording }]}>
              {isRecording ? "Gravando... Toque para parar" : "Toque para gravar áudio"}
            </Text>
          </TouchableOpacity> */}

        {/* PLAYER DE ÁUDIO (Aparece apenas quando o áudio está pronto) */}
        {/* {audioUri && !isRecording && (
            <View style={styles.playerContainer}>
              <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
                <Ionicons
                  name={isPlaying ? "pause" : "play"}
                  size={24}
                  color={COLORS.white}
                />
              </TouchableOpacity>

              <View style={styles.playerInfo}>
                <Text style={styles.playerText}>Áudio gravado com sucesso</Text>
                <Text style={styles.playerSubtext}>Toque para conferir a gravação</Text>
              </View>

              <TouchableOpacity style={styles.deleteAudioSmall} onPress={handleDeleteAudio}>
                <Feather name="trash-2" size={20} color={COLORS.danger} />
              </TouchableOpacity>
            </View>
          )}
        </View> */}

        {/* Seção de Áudio com expo-audio */}
        {/* <View style={styles.inputGroup}>
          <Text style={styles.label}><Text style={styles.required}>*</Text> Audio descrição do texto</Text>

          <TouchableOpacity
            style={[
              styles.uploadArea,
              recorder.isRecording && { borderColor: COLORS.recording, backgroundColor: '#FFF5F5' }
            ]}
            onPress={handleToggleRecording}
          >
            <Feather
              name={recorder.isRecording ? "mic-off" : "mic"}
              size={20}
              color={recorder.isRecording ? COLORS.recording : COLORS.textLight}
            />
            <Text style={[styles.uploadText, recorder.isRecording && { color: COLORS.recording }]}>
              {recorder.isRecording ? "Gravando... Toque para parar" : "Toque para gravar áudio"}
            </Text>
          </TouchableOpacity> */}

        {/* Player Simples e Moderno */}
        {/* {audioUri && !recorder.isRecording && (
            <View style={styles.playerContainer}>
              <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
                <Ionicons
                  name={player.playing ? "pause" : "play"}
                  size={24}
                  color={COLORS.white}
                />
              </TouchableOpacity>

              <View style={styles.playerInfo}>
                <Text style={styles.playerText}>Áudio pronto para revisão</Text>
                <Text style={styles.playerSubtext}>
                  {player.playing ? "Reproduzindo..." : "Toque para ouvir"}
                </Text>
              </View>

              <TouchableOpacity style={styles.deleteAudioSmall} onPress={handleDeleteAudio}>
                <Feather name="trash-2" size={20} color={COLORS.danger} />
              </TouchableOpacity>
            </View>
          )}
        </View> */}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <Text style={styles.required}>*</Text> Texto do verbete
          </Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Descrição do prato"
              placeholderTextColor={COLORS.placeholder}
              value={textoVerbete}
              onChangeText={setTextoVerbete}
              multiline
              maxLength={120}
              textAlignVertical="top"
            />
            <View style={styles.textAreaFooter}>
              <Text style={styles.charCount}>{textoVerbete.length}/120</Text>
              <Feather
                name="menu"
                size={12}
                color={COLORS.placeholder}
                style={{ transform: [{ rotate: '45deg' }] }}
              />
            </View>
          </View>
        </View>

        {/* Seção: Preparo */}
        <View style={[styles.sectionHeader, { marginTop: 10 }]}>
          <MaterialCommunityIcons name="chef-hat" size={24} color={COLORS.textDark} />
          <Text style={styles.sectionTitle}>Preparo</Text>
        </View>

        {/* Campo Categoria com as opções solicitadas */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <Text style={styles.required}>*</Text> Categoria
          </Text>
          <TouchableOpacity style={styles.selectInput} onPress={() => setShowCatModal(true)}>
            <Text
              style={[styles.selectText, categoria !== 'Selecionar' && { color: COLORS.textDark }]}
            >
              {categoria}
            </Text>
            <Feather name="chevron-down" size={20} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <Text style={styles.required}>*</Text> Tempo estimado
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 1 hora"
            placeholderTextColor={COLORS.placeholder}
            value={tempo}
            onChangeText={setTempo}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            <Text style={styles.required}>*</Text> Nível de dificuldade
          </Text>
          <TouchableOpacity style={styles.selectInput}>
            <Text style={styles.selectText}>Selecionar</Text>
            <Feather name="chevron-down" size={20} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnPrimary} onPress={handleNext}>
          <Text style={styles.btnPrimaryText}>Prosseguir</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de Seleção de Categoria */}
      <Modal visible={showCatModal} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowCatModal(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione uma Categoria</Text>
            {CATEGORIAS.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.modalOption}
                onPress={() => {
                  setCategoria(item);
                  setShowCatModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
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
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
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
  },
  selectText: { fontSize: 16, color: COLORS.textLight },
  uploadArea: {
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.uploadBg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  uploadText: { fontSize: 14, color: COLORS.textLight, paddingHorizontal: 10, textAlign: 'center' },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 15,
    height: 120,
  },
  textArea: { flex: 1, fontSize: 16, color: COLORS.textDark },
  textAreaFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 5,
    marginTop: 5,
  },
  charCount: { fontSize: 12, color: COLORS.placeholder },
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

  // Estilos do Modal de Categoria
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: { width: '80%', backgroundColor: '#FFF', borderRadius: 12, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  modalOption: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  modalOptionText: { fontSize: 16, color: COLORS.textDark, textAlign: 'center' },

  audioContainer: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  deleteAudio: {
    width: 55,
    height: 55,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.danger,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // NOVOS ESTILOS DO PLAYER
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  playerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  playerSubtext: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  deleteAudioSmall: {
    padding: 8,
  },
});
