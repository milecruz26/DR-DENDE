import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const COLORS = {
  primary: '#34523B',
  bg: '#FFFBE6',
  textDark: '#444',
  textLight: '#777',
  danger: '#B02132',
  cardBg: '#F5EEDC', // Fundo clarinho do cupom
};

export default function DetalhesEstabelecimento() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Pega o ID passado pela tela anterior

  const handleIgnorar = () => {
    router.back(); // Apenas volta, não altera a lista
  };

  const handleAutorizar = () => {
    // Volta para a lista enviando o ID para ser removido lá
    router.navigate({
      pathname: '/configuracoes/moderarEstabelecimentos',
      params: { idAprovado: id }
    });
  };

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backBtnText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Estabelecimento ipsum</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Imagem de Capa */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800' }}
          style={styles.coverImage}
        />

        {/* Abas Visuais */}
        <View style={styles.tabsRow}>
          <View style={[styles.tab, styles.tabActive]}>
            <Ionicons name="location-outline" size={18} color="#FFF" />
            <Text style={styles.tabTextActive}>Informações</Text>
          </View>
          <View style={styles.tab}>
            <MaterialCommunityIcons name="silverware-fork-knife" size={18} color={COLORS.textLight} />
            <Text style={styles.tabText}>Pratos da casa</Text>
          </View>
        </View>

        {/* Horários */}
        <Text style={styles.sectionTitle}>Horário de funcionamento:</Text>
        <View style={styles.scheduleBox}>
          {['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'].map(dia => (
            <View key={dia} style={styles.scheduleRow}>
              <Text style={styles.scheduleDay}>{dia}:</Text>
              <Text style={styles.scheduleTime}>08h00 – 18h00</Text>
            </View>
          ))}
        </View>

        {/* Valores */}
        <Text style={styles.sectionTitle}>Valores</Text>
        <Text style={styles.priceText}>Preço médio: <Text style={styles.priceValue}>R$ 50,00 - 120,00</Text></Text>

        {/* Cupom de Desconto */}
        <View style={styles.couponCard}>
          <View style={styles.couponHeader}>
            <MaterialCommunityIcons name="tag-outline" size={30} color={COLORS.textDark} />
            <View>
              <Text style={styles.couponLabel}>Cupom de desconto</Text>
              <Text style={styles.couponCode}>dende10</Text>
            </View>
          </View>
          <Text style={styles.couponDesc}>
            Você pode solicitar o desconto apenas uma vez e mostrar a solicitação no estabelecimento com seu nome.
          </Text>
        </View>

        {/* Localização */}
        <Text style={styles.sectionTitle}>Localização</Text>
        <View style={styles.mapPlaceholder}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800' }}
            style={styles.mapImage}
          />
        </View>
        <Text style={styles.addressText}>
          Rua das Mangueiras, nº 1287 — Bairro Rio Vermelho, Salvador – BA, CEP 00000-000
        </Text>

        {/* Redes Sociais */}
        <View style={styles.socialRow}>
          {['instagram', 'youtube', 'linkedin', 'facebook'].map(icon => (
            <View key={icon} style={styles.socialIcon}>
              <Feather name={icon as any} size={18} color="#FFF" />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Botões Flutuantes no Rodapé */}
      <View style={styles.footerRow}>
        <TouchableOpacity style={styles.btnOutline} onPress={handleIgnorar}>
          <Text style={styles.btnOutlineText}>Ignorar solicitação</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSolid} onPress={handleAutorizar}>
          <Text style={styles.btnSolidText}>Autorizar solicitação</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15 },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  backBtnText: { color: COLORS.primary, fontSize: 16 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: COLORS.textDark, marginRight: 60 },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },

  coverImage: { width: '100%', height: 180, borderRadius: 16, marginBottom: 20 },

  tabsRow: { flexDirection: 'row', gap: 10, marginBottom: 25 },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, borderRadius: 25, backgroundColor: '#EEE' },
  tabActive: { backgroundColor: '#E67E22' },
  tabText: { fontSize: 14, color: COLORS.textLight, fontWeight: 'bold' },
  tabTextActive: { fontSize: 14, color: '#FFF', fontWeight: 'bold' },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 15, marginTop: 10 },

  scheduleBox: { marginBottom: 20 },
  scheduleRow: { flexDirection: 'row', marginBottom: 8 },
  scheduleDay: { width: 120, fontSize: 15, color: COLORS.textLight },
  scheduleTime: { fontSize: 15, color: COLORS.textDark, fontWeight: '500' },

  priceText: { fontSize: 16, color: COLORS.textLight, marginBottom: 30 },
  priceValue: { color: COLORS.textDark, fontWeight: 'bold', textDecorationLine: 'underline' },

  couponCard: { backgroundColor: COLORS.cardBg, borderRadius: 12, padding: 20, marginBottom: 30 },
  couponHeader: { flexDirection: 'row', alignItems: 'center', gap: 15, marginBottom: 15 },
  couponLabel: { fontSize: 14, color: COLORS.textLight },
  couponCode: { fontSize: 22, fontWeight: 'bold', color: COLORS.textDark },
  couponDesc: { fontSize: 13, color: COLORS.textLight, lineHeight: 18 },

  mapPlaceholder: { width: '100%', height: 150, borderRadius: 12, overflow: 'hidden', marginBottom: 15 },
  mapImage: { width: '100%', height: '100%' },
  addressText: { fontSize: 14, color: COLORS.textDark, lineHeight: 20, marginBottom: 20 },

  socialRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  socialIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },

  footerRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.bg,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    gap: 15
  },
  btnOutline: { flex: 1, borderWidth: 1, borderColor: COLORS.danger, borderRadius: 8, paddingVertical: 14, alignItems: 'center' },
  btnOutlineText: { color: COLORS.danger, fontWeight: 'bold', fontSize: 14 },
  btnSolid: { flex: 1, backgroundColor: COLORS.primary, borderRadius: 8, paddingVertical: 14, alignItems: 'center' },
  btnSolidText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
});