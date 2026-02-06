import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Interfaces de Tipagem (TypeScript) ---
interface CategoryChipProps {
  label: string;
}

interface VerbeteCardProps {
  title: string;
  description: string;
}

interface EventItemProps {
  title: string;
}

// --- Definição de Cores e Estilos Globais ---
const COLORS = {
  background: '#FFFBE6', // Creme claro de fundo
  cardBeige: '#F2E8D5',
  cardOrange: '#E87C38',
  textDark: '#2C2C2C',
  textGreen: '#2F4F2F', // Verde escuro dos títulos/ícones
  highlightRed: '#D92B2B',
  navBar: '#2F4F2F',
  white: '#FFFFFF',
};

// ==========================================
// 1. Componentes Menores (Atoms/Molecules)
// ==========================================

const Header = () => (
  <View style={styles.headerContainer}>
    <View style={styles.avatarContainer}>
      <Ionicons name="person-circle" size={40} color={COLORS.cardOrange} />
    </View>
    <View style={styles.locationContainer}>
      <Ionicons name="location-outline" size={16} color="#666" />
      <Text style={styles.locationText}>40.000-00 Pituba</Text>
      <Ionicons name="chevron-down" size={16} color="#666" />
    </View>
  </View>
);

const SectionTitle = ({ title, showLink = false }: { title: string, showLink?: boolean }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitleText}>{title}</Text>
    {showLink && (
      <TouchableOpacity>
        <Text style={styles.linkText}>Ver todos</Text>
      </TouchableOpacity>
    )}
  </View>
);

const HighlightCard = () => (
  <View style={styles.highlightCard}>
    {/* Imagem Placeholder - Substitua pela sua URL ou require */}
    <View style={styles.highlightImageContainer}>
      <Image
        source={{ uri: 'https://via.placeholder.com/300x150/333/fff?text=Prato+Imagem' }}
        style={styles.highlightImage}
        resizeMode="cover"
      />
      {/* Badge "Novo" simulado */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>NOVO</Text>
      </View>
    </View>

    <View style={styles.highlightContent}>
      <Text style={styles.dishTitle}>PASSARINHA</Text>
      <Text style={styles.dishDesc}>
        Lorem ipsum dollorLorem ipsum dollor Lorem ipsum dollor
      </Text>
    </View>
  </View>
);

const CategoryChip = ({ label }: CategoryChipProps) => (
  <TouchableOpacity style={styles.chipContainer}>
    <View style={styles.dot} />
    <Text style={styles.chipText}>{label}</Text>
  </TouchableOpacity>
);

const VerbeteCard = ({ title, description }: VerbeteCardProps) => (
  <View style={styles.verbeteCard}>
    <Image
      source={{ uri: 'https://via.placeholder.com/100' }}
      style={styles.verbeteImage}
    />
    <View style={styles.verbeteContent}>
      <View style={styles.verbeteHeaderRow}>
        <Text style={styles.verbeteTitle}>{title}</Text>
        <Feather name="bookmark" size={20} color="#FFF" />
      </View>
      <Text style={styles.verbeteDesc} numberOfLines={3}>{description}</Text>
    </View>
  </View>
);

const DateSelector = () => (
  <View style={styles.dateSelectorRow}>
    <TouchableOpacity style={styles.arrowButton}>
      <Feather name="chevron-left" size={24} color={COLORS.textGreen} />
    </TouchableOpacity>

    <View style={styles.dateItem}>
      <Text style={styles.dateText}>27/Dez</Text>
    </View>

    <View style={[styles.dateItem, styles.dateItemSelected]}>
      <Text style={[styles.dateText, styles.dateTextSelected]}>25/Dez</Text>
    </View>

    <View style={styles.dateItem}>
      <Text style={styles.dateText}>26/Dez</Text>
    </View>

    <TouchableOpacity style={styles.arrowButton}>
      <Feather name="chevron-right" size={24} color={COLORS.textGreen} />
    </TouchableOpacity>
  </View>
);

const EventItem = ({ title }: EventItemProps) => (
  <View style={styles.eventItem}>
    <MaterialCommunityIcons name="bullhorn-outline" size={20} color={COLORS.textGreen} />
    <Text style={styles.eventTitle}>{title}</Text>
  </View>
);

// Barra de navegação inferior (apenas visual para esta tela)
const MockTabBar = () => (
  <View style={styles.tabBar}>
    <TouchableOpacity><Feather name="home" size={24} color="#D4AF37" /></TouchableOpacity>
    <TouchableOpacity><Feather name="book-open" size={24} color="#8FAA8F" /></TouchableOpacity>

    <View style={styles.searchButtonContainer}>
      <TouchableOpacity style={styles.searchButton}>
        <Feather name="search" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>

    <TouchableOpacity><Feather name="calendar" size={24} color="#8FAA8F" /></TouchableOpacity>
    <TouchableOpacity><MaterialCommunityIcons name="silverware-fork-knife" size={24} color="#8FAA8F" /></TouchableOpacity>
  </View>
);

// ==========================================
// 2. Tela Principal (Home Screen)
// ==========================================

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.contentContainer}>
        {/* Header Fixo */}
        <Header />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          {/* Seção Destaques */}
          <SectionTitle title="Destaques" />
          <HighlightCard />

          {/* Categorias (Scroll Horizontal) */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            <CategoryChip label="Comida com dendê" />
            <CategoryChip label="Tira-gosto" />
            <CategoryChip label="Afro-indígena" />
          </ScrollView>

          {/* Seção Verbetes */}
          <SectionTitle title="Verbetes" showLink />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            <VerbeteCard
              title="FEIJOADA"
              description="A feijoada é um prato muito popular em todo o Brasil."
            />
            {/* Adicione mais cards aqui se necessário */}
            <View style={{ width: 20 }} />
          </ScrollView>

          {/* Seção Eventos */}
          <SectionTitle title="Eventos" showLink />
          <DateSelector />
          <View style={styles.eventList}>
            <EventItem title="FEIJOADA DE SEU ZÉ" />
            <EventItem title="CEIA BENEFICENTE" />
            <EventItem title="CEIA BENEFICENTE" />
            <EventItem title="REUNIÃO GERAL" />
          </View>

          {/* Espaço extra para não ficar atrás da TabBar */}
          <View style={{ height: 100 }} />

        </ScrollView>

        {/* Bottom Tab Bar (Posicionada Absolutamente) */}
        <MockTabBar />
      </View>
    </SafeAreaView>
  );
}

// ==========================================
// 3. Estilos
// ==========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  // Header
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  avatarContainer: {
    // Estilo simples para o avatar
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  locationText: {
    color: '#666',
    fontSize: 14,
  },

  // Titles
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  linkText: {
    color: COLORS.textGreen,
    fontSize: 14,
  },

  // Destaques Card
  highlightCard: {
    backgroundColor: COLORS.cardBeige,
    borderRadius: 20,
    padding: 15,
    minHeight: 280,
  },
  highlightImageContainer: {
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  highlightImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    // Aqui você usaria uma imagem transparente do prato
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: COLORS.highlightRed,
    padding: 10,
    borderRadius: 20, // Simulando o formato de explosão/starburst
    transform: [{ rotate: '15deg' }],
  },
  badgeText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  highlightContent: {
    marginTop: 10,
  },
  dishTitle: {
    fontSize: 24,
    fontWeight: '800', // Extra bold simulado
    color: COLORS.cardOrange,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  dishDesc: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },

  // Chips
  horizontalScroll: {
    marginVertical: 10,
    overflow: 'visible', // Permite sombra fora da view
  },
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#C4A484', // Cor bronze/marrom claro
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: COLORS.white,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C4A484',
    marginRight: 6,
  },
  chipText: {
    color: '#8B5A2B',
    fontWeight: '600',
  },

  // Verbetes
  verbeteCard: {
    backgroundColor: COLORS.cardOrange,
    borderRadius: 16,
    padding: 15,
    width: 280,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  verbeteImage: {
    width: 80,
    height: 80,
    borderRadius: 40, // Circular simulado
    marginRight: 15,
    backgroundColor: '#333', // Placeholder color
  },
  verbeteContent: {
    flex: 1,
  },
  verbeteHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  verbeteTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFF',
    fontStyle: 'italic',
  },
  verbeteDesc: {
    color: '#FFF',
    fontSize: 12,
  },

  // Eventos
  dateSelectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardBeige,
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
  },
  arrowButton: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
  },
  dateItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  dateItemSelected: {
    backgroundColor: COLORS.textGreen,
  },
  dateText: {
    color: COLORS.textGreen,
    fontWeight: 'bold',
  },
  dateTextSelected: {
    color: '#FFF',
  },
  eventList: {
    gap: 10,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBeige,
    padding: 15,
    borderRadius: 12,
    gap: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '900', // Fonte grossa estilo display
    color: COLORS.textGreen,
    fontStyle: 'italic',
  },

  // Mock Tab Bar
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: COLORS.navBar,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20, // Para safe area no iPhone X+
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  searchButtonContainer: {
    top: -20, // Efeito flutuante
  },
  searchButton: {
    backgroundColor: '#1E331E', // Um tom mais escuro que a nav bar
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.navBar,
  }
});