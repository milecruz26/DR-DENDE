import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { height } = Dimensions.get('window');

interface ReadMoreModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  content: string;
}

export function ReadMoreModal({ visible, onClose, title = "Sobre o prato", content }: ReadMoreModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // Obrigatório para Android (botão físico de voltar)
    >
      {/* Fundo escuro transparente */}
      <View style={styles.overlay}>

        {/* A "Gaveta" Branca */}
        <View style={styles.modalContainer}>

          {/* Header do Modal */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Feather name="chevron-left" size={24} color="#555" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>{title}</Text>

            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Feather name="x" size={24} color="#555" />
            </TouchableOpacity>
          </View>

          {/* Conteúdo com Scroll */}
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.textContent}>
              {content}
            </Text>

            {/* Espaço extra no final para garantir leitura confortável */}
            <View style={{ height: 40 }} />
          </ScrollView>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Fundo escurecido atrás do modal
    justifyContent: 'flex-end', // Empurra o conteúdo para baixo
  },
  modalContainer: {
    backgroundColor: '#FFFBE6', // Mesma cor de fundo do app
    height: '92%', // Ocupa quase a tela toda, deixando um topo escuro visível
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C2C2C', // COLORS.textDark
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  textContent: {
    fontSize: 16,
    color: '#555', // COLORS.textGray
    lineHeight: 26, // Bom espaçamento para leitura
    textAlign: 'justify',
  },
});