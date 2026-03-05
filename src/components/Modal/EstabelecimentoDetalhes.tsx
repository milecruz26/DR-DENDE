import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function EstabelecimentoDetalhes() {
  const [activeTab, setActiveTab] = useState<'info' | 'pratos'>('info');
  const [activeCategory, setActiveCategory] = useState('Todos');

  const categorias = ['Todos', 'Almoços', 'Tira-gostos', 'Petiscos'];

  // Mock de dados para os pratos baseado na imagem
  const pratos = [
    { id: '1', nome: 'Nome do prato', hasVerbete: true },
    { id: '2', nome: 'Nome do prato', hasVerbete: true },
    { id: '3', nome: 'Nome do prato', hasVerbete: false },
    { id: '4', nome: 'Nome do prato', hasVerbete: false },
    { id: '5', nome: 'Nome do prato', hasVerbete: false },
    { id: '6', nome: 'Nome do prato', hasVerbete: false },
  ];

  return (
    <View style={styles.container}>
      {/* 1. Capa e Avatar */}
      <View style={styles.heroSection}>
        <View style={styles.coverImagePlaceholder}>
          {/* Substituir por <Image source={...} style={styles.coverImage} /> */}
        </View>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarPlaceholder}>
            <Text style={{ fontSize: 10, textAlign: 'center' }}>Logo</Text>
          </View>
        </View>
      </View>

      {/* 2. Abas (Tabs) */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'info' && styles.tabActive]}
          onPress={() => setActiveTab('info')}
        >
          <Feather name="map-pin" size={16} color={activeTab === 'info' ? '#FFF' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'info' && styles.tabTextActive]}>Informações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'pratos' && styles.tabActive]}
          onPress={() => setActiveTab('pratos')}
        >
          <Feather name="book-open" size={16} color={activeTab === 'pratos' ? '#FFF' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'pratos' && styles.tabTextActive]}>Pratos da casa</Text>
        </TouchableOpacity>
      </View>

      {/* 3. Conteúdo: Informações */}
      {activeTab === 'info' && (
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Horário de funcionamento:</Text>
          {['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'].map((dia) => (
            <View key={dia} style={styles.row}>
              <Text style={styles.textLabel}>{dia}:</Text>
              <Text style={styles.textValue}>08h00 – 18h00</Text>
            </View>
          ))}

          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.btnOutlineGreen}>
              <Text style={styles.btnOutlineGreenText}>Mensagem whatsapp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOutlineRed}>
              <Text style={styles.btnOutlineRedText}>Denunciar</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Valores</Text>
          <View style={styles.row}>
            <Text style={styles.textLabel}>Preço médio:</Text>
            <Text style={[styles.textValue, { textDecorationLine: 'underline' }]}>R$ 50,00 - 120,00</Text>
          </View>

          {/* Cupom */}
          <View style={styles.couponCard}>
            <View style={styles.couponHeader}>
              <Feather name="tag" size={24} color="#555" />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.couponTitle}>Cupom de desconto</Text>
                <TouchableOpacity style={styles.btnSolidGreen}>
                  <Text style={styles.btnSolidGreenText}>Solicitar desconto</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.couponDisclaimer}>
              Você pode solicitar o desconto apenas uma vez e mostrar a solicitação no estabelecimento com seu nome.
            </Text>
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Localização</Text>
          <View style={styles.mapPlaceholder} />
          <Text style={styles.addressText}>
            Rua das Mangueiras, nº 1287 — Bairro Rio Vermelho, Salvador — BA, CEP 00000-000
          </Text>

          {/* Redes Sociais */}
          <View style={styles.socialRow}>
            {['instagram', 'youtube', 'linkedin', 'facebook'].map((iconName, index) => (
              <TouchableOpacity key={index} style={styles.socialIcon}>
                <Feather name={iconName as any} size={16} color="#FFF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* 4. Conteúdo: Pratos da Casa */}
      {activeTab === 'pratos' && (
        <View style={styles.contentSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {categorias.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.filterChip, activeCategory === cat && styles.filterChipActive]}
                onPress={() => setActiveCategory(cat)}
              >
                <View style={[styles.filterDot, activeCategory === cat ? styles.dotBlue : styles.dotBrown]} />
                <Text style={[styles.filterText, activeCategory === cat && styles.filterTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.gridContainer}>
            {pratos.map((prato) => (
              <View key={prato.id} style={styles.dishCard}>
                <View style={styles.dishImageBg}>
                  <TouchableOpacity style={styles.dishMenuBtn}>
                    <Feather name="more-vertical" size={16} color="#FFF" />
                  </TouchableOpacity>
                  <Text style={styles.dishTitle}>{prato.nome}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.btnVerbete, prato.hasVerbete ? styles.btnVerbeteActive : styles.btnVerbeteInactive]}
                >
                  <Feather name="book-open" size={14} color={prato.hasVerbete ? '#FFF' : '#A8A8A8'} />
                  <Text style={[styles.verbeteText, !prato.hasVerbete && styles.verbeteTextInactive]}>
                    Ver verbete
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Usei paddingBottom para compensar o scroll do modal pai
  container: { paddingBottom: 40, gap: 20 },

  // Hero Section
  heroSection: { position: 'relative', marginBottom: 20 },
  coverImagePlaceholder: {
    height: 140,
    backgroundColor: '#D1A25B', // Cor de teste, troque pela imagem
    borderRadius: 16,
  },
  avatarWrapper: {
    position: 'absolute',
    bottom: -30,
    left: 20,
    backgroundColor: '#FFFBE6', // Cor do fundo do modal
    borderRadius: 50,
    padding: 4,
  },
  avatarPlaceholder: {
    width: 70, height: 70,
    borderRadius: 35,
    backgroundColor: '#FFF',
    borderWidth: 1, borderColor: '#EEE',
    justifyContent: 'center', alignItems: 'center'
  },

  // Tabs
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 4,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }
  },
  tabButton: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 10, borderRadius: 25, gap: 8
  },
  tabActive: { backgroundColor: '#E07C30' },
  tabText: { color: '#888', fontWeight: '600', fontSize: 14 },
  tabTextActive: { color: '#FFF' },

  // Info Content
  contentSection: { gap: 12 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#454545', marginBottom: 4 },
  row: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' },
  textLabel: { width: 120, fontSize: 14, color: '#777' },
  textValue: { fontSize: 14, color: '#454545', fontWeight: '500' },

  // Buttons Info
  actionButtonsRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  btnOutlineGreen: { flex: 1, borderWidth: 1, borderColor: '#34523B', borderRadius: 8, paddingVertical: 10, alignItems: 'center' },
  btnOutlineGreenText: { color: '#34523B', fontWeight: 'bold', fontSize: 14 },
  btnOutlineRed: { flex: 1, borderWidth: 1, borderColor: '#933543', borderRadius: 8, paddingVertical: 10, alignItems: 'center' },
  btnOutlineRedText: { color: '#933543', fontWeight: 'bold', fontSize: 14 },

  // Coupon
  couponCard: { backgroundColor: '#F8F1E4', padding: 16, borderRadius: 12, marginTop: 12 },
  couponHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  couponTitle: { color: '#888', fontSize: 13, marginBottom: 8 },
  btnSolidGreen: { backgroundColor: '#34523B', borderRadius: 8, paddingVertical: 10, alignItems: 'center' },
  btnSolidGreenText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  couponDisclaimer: { fontSize: 11, color: '#888', textAlign: 'center', lineHeight: 16 },

  // Location & Social
  mapPlaceholder: { height: 160, backgroundColor: '#E2E2E2', borderRadius: 12 },
  addressText: { fontSize: 14, color: '#555', lineHeight: 20 },
  socialRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
  socialIcon: { width: 36, height: 36, backgroundColor: '#34523B', borderRadius: 18, justifyContent: 'center', alignItems: 'center' },

  // Pratos Content
  filterScroll: { marginBottom: 16 },
  filterChip: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderWidth: 1, borderColor: '#D7C7A7', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 6, marginRight: 8, backgroundColor: '#FFF'
  },
  filterChipActive: { borderColor: '#3488D9' },
  filterDot: { width: 8, height: 8, borderRadius: 4 },
  dotBlue: { backgroundColor: '#3488D9' },
  dotBrown: { backgroundColor: '#A28359' },
  filterText: { color: '#A28359', fontWeight: '600' },
  filterTextActive: { color: '#3488D9' },

  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  dishCard: { width: '48%', marginBottom: 8 },
  dishImageBg: {
    height: 120, backgroundColor: '#333', borderTopLeftRadius: 12, borderTopRightRadius: 12,
    padding: 8, justifyContent: 'space-between'
  },
  dishMenuBtn: { alignSelf: 'flex-end', backgroundColor: 'rgba(52, 82, 59, 0.8)', padding: 4, borderRadius: 6 },
  dishTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  btnVerbete: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 8, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, gap: 6 },
  btnVerbeteActive: { backgroundColor: '#34523B' },
  btnVerbeteInactive: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EAEAEA', borderTopWidth: 0 },
  verbeteText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  verbeteTextInactive: { color: '#A8A8A8' }
});