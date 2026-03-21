import { Feather } from '@expo/vector-icons';
import React, { ReactNode, useEffect, useRef } from 'react';
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

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
type ModalType = 'small' | 'medium' | 'full';

// Interface preparada para a API
interface ReadMoreModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string
  type?: ModalType;
}

export function ReadMoreModal({ visible, onClose, title, children, type = 'full' }: ReadMoreModalProps) {

  const heightMap = {
    small: SCREEN_HEIGHT * 0.45,  // 35% da tela (Ideal para confirmação)
    medium: SCREEN_HEIGHT * 0.60, // 60% da tela
    full: SCREEN_HEIGHT * 0.92,   // 92% da tela (Seu padrão atual)
  };
  const currentHeight = heightMap[type];

  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: SCREEN_HEIGHT, duration: 250, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.root} pointerEvents={visible ? 'auto' : 'none'}>

      <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
        <Pressable style={{ flex: 1 }} onPress={onClose} />
      </Animated.View>


      <Animated.View
        style={[
          styles.modalContainer,
          {
            height: currentHeight,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.header}>
          {type === "small" ?
            <></>
            :
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
              <Feather name="chevron-left" size={24} color="#555" />
            </TouchableOpacity>
          }

          {/* Dados dinâmicos vindo da prop 'data' */}
          <Text style={styles.headerTitle}>{title || "Sobre o prato"}</Text>

          <TouchableOpacity onPress={onClose} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
            <Feather name="x" size={24} color="#555" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={type === 'full'}
          contentContainerStyle={styles.scrollContent}
          scrollEnabled={type !== 'small'}
        >
          {children}

          <View style={{ height: 20 }} />
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