import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { height } = Dimensions.get('window');

interface EstabelecimentoModalProps {
  visible: boolean;
  onClose: () => void;
  // Aqui você pode passar os dados do estabelecimento selecionado futuramente
  // estabelecimento: EstabelecimentoType;
}

export default function EstabelecimentoModal({ visible, onClose }: EstabelecimentoModalProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'pratos'>('info');
  const [activeCategory, setActiveCategory] = useState('Todos');

  const categorias = ['Todos', 'Almoços', 'Tira-gostos', 'Petiscos'];

  // Mock de dados para os pratos
  const pratos = [
    { id: '1', nome: 'Acarajé Completo', hasVerbete: true },
    { id: '2', nome: 'Moqueca de Peixe', hasVerbete: true },
    { id: '3', nome: 'Xinxim de Galinha', hasVerbete: false },
    { id: '4', nome: 'Abará', hasVerbete: false },
  ];

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.bottomSheet}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Feather name="chevron-left" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Estabelecimento ipsum</Text>
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Feather name="x" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            {/* Imagem de Capa e Avatar */}
            <View style={styles.heroContainer}>
              <View style={styles.heroImagePlaceholder} />
              <View style={styles.avatarContainer}>
                <View style={styles.avatarPlaceholder} />
              </View>
            </View>

            {/* Abas (Tabs) */}
            <View style={styles.tabsContainer}>
              <TouchableOpacity
                style={[styles.tabButton, activeTab === 'info' && styles.tabButtonActive]}
                onPress={() => setActiveTab('info')}
              >
                <Feather name="map-pin" size={16} color={activeTab === 'info' ? '#FFF' : '#666'} />
                <Text style={[styles.tabText, activeTab === 'info' && styles.tabTextActive]}>
                  Informações
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tabButton, activeTab === 'pratos' && styles.tabButtonActive]}
                onPress={() => setActiveTab('pratos')}
              >
                <Feather
                  name="book-open"
                  size={16}
                  color={activeTab === 'pratos' ? '#FFF' : '#666'}
                />
                <Text style={[styles.tabText, activeTab === 'pratos' && styles.tabTextActive]}>
                  Pratos da casa
                </Text>
              </TouchableOpacity>
            </View>

            {/* CONTEÚDO: INFORMAÇÕES */}
            {activeTab === 'info' && (
              <View style={styles.contentContainer}>
                <Text style={styles.sectionTitle}>Horário de funcionamento:</Text>
                {[
                  'Segunda-feira',
                  'Terça-feira',
                  'Quarta-feira',
                  'Quinta-feira',
                  'Sexta-feira',
                  'Sábado',
                  'Domingo',
                ].map((dia) => (
                  <View key={dia} style={styles.row}>
                    <Text style={styles.textLight}>{dia}:</Text>
                    <Text style={styles.textDark}>08h00 – 18h00</Text>
                  </View>
                ))}

                <View style={styles.actionButtonsRow}>
                  <TouchableOpacity style={styles.btnOutlineGreen}>
                    <Text style={styles.btnOutlineGreenText}>Mensagem whatsapp</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnOutlineRed}>
                    <Text style={styles.btnOutlineRedText}>Denúnciar</Text>
                  </TouchableOpacity>
                </View>

                <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Valores</Text>
                <View style={styles.row}>
                  <Text style={styles.textLight}>Preço médio:</Text>
                  <Text style={[styles.textDark, { textDecorationLine: 'underline' }]}>
                    R$ 50,00 - 120,00
                  </Text>
                </View>

                {/* Cupom */}
                <View style={styles.cupomCard}>
                  <View style={styles.cupomHeader}>
                    <Feather name="tag" size={24} color="#666" />
                    <View style={styles.cupomContent}>
                      <Text style={styles.textLight}>Cupom de desconto</Text>
                      <TouchableOpacity style={styles.btnSolidGreen}>
                        <Text style={styles.btnSolidGreenText}>Solicitar desconto</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.cupomDisclaimer}>
                    Você pode solicitar o desconto apenas uma vez e mostrar a solicitação no
                    estabelecimento com seu nome.
                  </Text>
                </View>

                <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Localização</Text>
                <View style={styles.mapPlaceholder} />
                <Text style={styles.addressText}>
                  Rua das Mangueiras, nº 1287 — Bairro Rio Vermelho, Salvador — BA, CEP 00000-000
                </Text>

                <View style={styles.socialRow}>
                  {['instagram', 'youtube', 'linkedin', 'facebook'].map((soc) => (
                    <View key={soc} style={styles.socialIcon}>
                      <Feather name={soc as any} size={16} color="#FFF" />
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* CONTEÚDO: PRATOS DA CASA */}
            {activeTab === 'pratos' && (
              <View style={styles.contentContainer}>
                {/* Filtros */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.filtersScroll}
                >
                  {categorias.map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      style={styles.filterChip}
                      onPress={() => setActiveCategory(cat)}
                    >
                      <View
                        style={[
                          styles.dot,
                          activeCategory === cat ? styles.dotActive : styles.dotInactive,
                        ]}
                      />
                      <Text style={styles.filterText}>{cat}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                {/* Grid de Pratos */}
                <View style={styles.pratosGrid}>
                  {pratos.map((prato) => (
                    <View key={prato.id} style={styles.pratoCard}>
                      <View style={styles.pratoImagePlaceholder}>
                        <View style={styles.pratoMenuIcon}>
                          <Feather name="more-vertical" size={16} color="#FFF" />
                        </View>
                        <Text style={styles.pratoTitle}>{prato.nome}</Text>
                      </View>
                      <TouchableOpacity
                        style={[
                          styles.btnVerbete,
                          prato.hasVerbete ? styles.btnVerbeteActive : styles.btnVerbeteInactive,
                        ]}
                      >
                        <Feather name="book" size={14} color={prato.hasVerbete ? '#FFF' : '#CCC'} />
                        <Text
                          style={[
                            styles.btnVerbeteText,
                            !prato.hasVerbete && styles.btnVerbeteTextInactive,
                          ]}
                        >
                          Ver verbete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#FFFBF2', // Cor de fundo principal
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: height * 0.9, // Ocupa 90% da tela
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heroImagePlaceholder: {
    width: '90%',
    height: 120,
    backgroundColor: '#4A90E2', // Mockup image
    borderRadius: 16,
  },
  avatarContainer: {
    position: 'absolute',
    bottom: -35,
    left: '10%',
    backgroundColor: '#FFF',
    padding: 4,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    backgroundColor: '#E67E22', // Mockup logo
    borderRadius: 35,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 25,
    gap: 8,
  },
  tabButtonActive: {
    backgroundColor: '#E5873C', // Laranja do layout
  },
  tabText: {
    color: '#666',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFF',
  },
  contentContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 10,
  },
  textLight: {
    color: '#8E8E8E',
    width: 100,
  },
  textDark: {
    color: '#4A4A4A',
    fontWeight: '500',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
  },
  btnOutlineGreen: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#36533A',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnOutlineGreenText: {
    color: '#36533A',
    fontWeight: 'bold',
  },
  btnOutlineRed: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#C0392B',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnOutlineRedText: {
    color: '#C0392B',
    fontWeight: 'bold',
  },
  cupomCard: {
    backgroundColor: '#F7EEDC',
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
  },
  cupomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 10,
  },
  cupomContent: {
    flex: 1,
  },
  btnSolidGreen: {
    backgroundColor: '#36533A',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  btnSolidGreenText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  cupomDisclaimer: {
    fontSize: 11,
    color: '#8E8E8E',
    textAlign: 'center',
  },
  mapPlaceholder: {
    height: 150,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    marginBottom: 10,
  },
  addressText: {
    color: '#4A4A4A',
    lineHeight: 20,
    marginBottom: 15,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 10,
  },
  socialIcon: {
    width: 36,
    height: 36,
    backgroundColor: '#36533A',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersScroll: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4C4A8',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: { backgroundColor: '#3498DB' },
  dotInactive: { backgroundColor: '#A68A61' },
  filterText: {
    color: '#705A3E',
    fontWeight: '500',
  },
  pratosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  pratoCard: {
    width: '48%',
    marginBottom: 15,
  },
  pratoImagePlaceholder: {
    height: 120,
    backgroundColor: '#2C3E50', // Mockup image dark
    borderRadius: 12,
    padding: 10,
    justifyContent: 'space-between',
  },
  pratoMenuIcon: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(54, 83, 58, 0.8)',
    borderRadius: 12,
    padding: 4,
  },
  pratoTitle: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  btnVerbete: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    gap: 6,
  },
  btnVerbeteActive: {
    backgroundColor: '#36533A',
  },
  btnVerbeteInactive: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D4C4A8',
    borderTopWidth: 0,
  },
  btnVerbeteText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 12,
  },
  btnVerbeteTextInactive: {
    color: '#D4C4A8',
  },
});
