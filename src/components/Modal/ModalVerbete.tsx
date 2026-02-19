import { Feather } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { height } = Dimensions.get('window');

// Interface preparada para a API
interface ReadMoreModalProps {
  visible: boolean;
  onClose: () => void;
  // Quando integrar com a API, você passará o objeto 'item' ou 'verbete'
  children: React.JSX.Element; // Para permitir conteúdo customizado, como imagens ou botões
  title?: string
  // data?: {
  //   title: string;
  //   content: string;
  // };
}

export function ReadMoreModal({ visible, onClose, title, children }: ReadMoreModalProps) {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animação de entrada
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
    } else {
      // Animação de saída
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: height, duration: 250, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.root} pointerEvents={visible ? 'auto' : 'none'}>
      {/* Overlay - Ao clicar aqui também fecha */}
      <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
        <Pressable style={{ flex: 1 }} onPress={onClose} />
      </Animated.View>

      {/* Container Animado (A Gaveta) */}
      <Animated.View
        style={[
          styles.modalContainer,
          { transform: [{ translateY: slideAnim }] }
        ]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
            <Feather name="chevron-left" size={24} color="#555" />
          </TouchableOpacity>

          {/* Dados dinâmicos vindo da prop 'data' */}
          <Text style={styles.headerTitle}>{title || "Sobre o prato"}</Text>

          <TouchableOpacity onPress={onClose} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
            <Feather name="x" size={24} color="#555" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.scrollContent}>
          {children}
          {/* <View style={styles.containerInfo}>
            <Text style={styles.highlightTitle}>
              Sobre o evento
            </Text>
            <Text style={styles.textContent}>
              Evento anual de seu zé que ocorre para comemoração coletiva de fim de ano com uma pitada de cultura baiana, com muita música e comida.
            </Text>
          </View>

          <View style={styles.containerInfo}>
            <Text style={styles.highlightTitle}>
              Informações do evento
            </Text>
            <Text style={styles.textContent}>
              Segunda-feira 25/12 :  08h00 – 18h00
            </Text>
          </View>

          <View style={styles.containerInfo}>
            <Text style={styles.highlightTitle}>
              Localização
            </Text>
            <Image
              source={require('../../../assets/mock/map.png')}
            />
            <Text style={styles.textContent}>
              Rua das Mangueiras, nº 1287 — Bairro Rio Vermelho, Salvador – BA, CEP 00000-000
            </Text>
          </View>
          <SecondaryButton
            onPress={() => { }}
            title='Ver lista de eventos'
            size='small'
          /> */}


          {/* Espaço extra para não ficar atrás da TabBar no final do scroll */}
          <View style={{ height: 10 }} />
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 50, // Menor que o 999 da TabBar
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#FFFBE6',
    height: '92%',
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
    color: '#2C2C2C',
  },
  scrollContent: {
    paddingHorizontal: 24,
    gap: 24
  },
  textContent: {
    fontSize: 16,
    color: '#454545',
    lineHeight: 26,
    textAlign: 'justify',
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#191919'
  },
  containerInfo: {
    gap: 16,
  }
});