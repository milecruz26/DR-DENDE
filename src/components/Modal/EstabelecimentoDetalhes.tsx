import { coverImageMap, defaultCover, defaultLogo, logoImageMap } from '@/constants/imgMaps';
import { useEstablishmentDishes } from '@/hooks/useEstablishment';
import { User } from '@/interfaces';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



interface EstabelecimentoDetalhesProps {
  establishment: User; // ou um tipo específico para estabelecimento
}

export function EstabelecimentoDetalhes({ establishment }: EstabelecimentoDetalhesProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'info' | 'pratos'>('info');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const { data: dishes = [], isLoading } = useEstablishmentDishes(establishment.id);

  const categorias = ['Todos', 'Almoços', 'Tira-gostos', 'Petiscos'];

  const { username, cover_image, logo_image, opening_hours, min_price, max_price, coupon_enabled, coupon_percentage, social, address } = establishment;
  const coverSource = coverImageMap[establishment.id as keyof typeof coverImageMap] || defaultCover;
  const logoSrc = logoImageMap[establishment.id as keyof typeof logoImageMap] || defaultLogo;
  // Mock de dados para os pratos baseado na imagem
  const pratos = [
    { id: '1', nome: 'Nome do prato', hasVerbete: true },
    { id: '2', nome: 'Nome do prato', hasVerbete: true },
    { id: '3', nome: 'Nome do prato', hasVerbete: false },
    { id: '4', nome: 'Nome do prato', hasVerbete: false },
    { id: '5', nome: 'Nome do prato', hasVerbete: false },
    { id: '6', nome: 'Nome do prato', hasVerbete: false },
  ];

  // const filteredDishes = activeCategory === 'Todos'
  //   ? dishes
  //   : dishes.filter(dish => dish.category === activeCategory); // Assumindo que Dish tenha campo `category`

  return (
    <View style={styles.container}>
      {/* 1. Capa e Avatar */}
      <View style={styles.heroSection}>

        {/* <View > */}
        <Image source={coverSource} style={styles.coverImagePlaceholder} />
        {/* Substituir por <Image source={...} style={styles.coverImage} /> */}
        {/* </View> */}
        <View style={styles.avatarWrapper}>
          <Image source={logoSrc} style={styles.avatarPlaceholder} />
          {/* <View style={styles.avatarPlaceholder}>
            <Text style={{ fontSize: 10, textAlign: 'center' }}>Logo</Text>
          </View> */}
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
          {(Array.isArray(opening_hours) ? opening_hours : []).map((h) => (
            <View key={h.day} style={styles.row}>
              <Text style={styles.textLabel}>{h.day}:</Text>
              <Text style={styles.textValue}>{h.open} – {h.close}</Text>
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
            <Text style={[styles.textValue, { textDecorationLine: 'underline' }]}>R$ {min_price} – R$ {max_price}</Text>
          </View>

          {/* Cupom */}
          <View style={styles.couponCard}>
            <View style={styles.couponHeader}>
              <Feather name="tag" size={24} color="#555" />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.couponTitle}>Cupom de desconto</Text>
                {coupon_enabled && (
                  <TouchableOpacity style={styles.btnSolidGreen}>
                    <Text style={styles.btnSolidGreenText}>Solicitar desconto</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <Text style={styles.couponDisclaimer}>
              Você pode solicitar o desconto apenas uma vez e mostrar a solicitação no estabelecimento com seu nome.
            </Text>
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Localização</Text>
          <View style={styles.mapPlaceholder} />
          <Text style={styles.addressText}>
            {address}
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
            {dishes.map((dish) => (
              <View key={dish.id} style={styles.dishCard}>
                <View style={styles.dishImageBg}>
                  <Image
                    source={{ uri: dish.dish_image_path }}
                    style={styles.dishImage}
                    resizeMode="cover"
                  />
                  <TouchableOpacity style={styles.dishMenuBtn}>
                    <Feather name="more-vertical" size={16} color="#FFF" />
                  </TouchableOpacity>
                  <Text style={styles.dishTitle}>{dish.name}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.btnVerbete, dish.associated_entry ? styles.btnVerbeteActive : styles.btnVerbeteInactive]}
                  onPress={() => {
                    if (dish.associated_entry) {
                      router.push(`/verbete?id=${dish.associated_entry}`);
                    }
                  }}
                  disabled={!dish.associated_entry}
                >
                  <Feather name="book-open" size={14} color={dish.associated_entry ? '#FFF' : '#A8A8A8'} />
                  <Text style={[styles.verbeteText, !dish.associated_entry && styles.verbeteTextInactive]}>
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
  container: { paddingBottom: 40, gap: 20, paddingHorizontal: 16 },

  // Hero Section
  heroSection: { position: 'relative', marginBottom: 20 },
  coverImagePlaceholder: {
    height: 140,
    backgroundColor: '#D1A25B', // Cor de teste, troque pela imagem
    borderRadius: 16,
    width: "100%"
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
    padding: 8, justifyContent: 'space-between', overflow: 'hidden',
  },
  dishMenuBtn: { alignSelf: 'flex-end', backgroundColor: 'rgba(52, 82, 59, 0.8)', padding: 4, borderRadius: 6 },
  dishImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  dishTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  btnVerbete: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 8, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, gap: 6 },
  btnVerbeteActive: { backgroundColor: '#34523B' },
  btnVerbeteInactive: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EAEAEA', borderTopWidth: 0 },
  verbeteText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  verbeteTextInactive: { color: '#A8A8A8' }
});