import { Avatar } from '@/components/Avatar';
import { useAuth } from '@/context/AuthContext';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const { signOut } = useAuth(); // Pegamos o usuário logado e a função de sair

  const handleNavigation = (route: string) => {
    setShowMenu(false);
    // @ts-ignore - Ajuste conforme sua estrutura de rotas
    router.push(route);
  };


  const handleLogout = () => {
    signOut();
    router.replace('/(login)'); // Volta para o login ao sair
  };

  return (
    <View style={styles.headerContainer}>
      <View >
        <Pressable onPress={() => setShowMenu(!showMenu)} style={{ padding: 5 }}>
          <Avatar />
        </Pressable>
        {showMenu && (
          <>
            {/* Overlay invisível para fechar ao clicar fora */}
            <Pressable style={styles.outsideClick} onPress={() => setShowMenu(false)} />

            <View style={styles.dropdownMenu}>
              {/* Opção Favoritos */}
              <Pressable
                style={styles.menuItem}
                onPress={() => handleNavigation('/favoritos')}
              >
                <Text style={styles.menuItemText}>Favoritos</Text>
                <Feather name="star" size={16} color="#666" />
              </Pressable>

              <View style={styles.menuDivider} />

              {/* Opção Configurações */}
              <Pressable
                style={styles.menuItem}
                onPress={() => handleNavigation('/configuracoes')}
              >
                <Text style={styles.menuItemText}>Configurações</Text>
                <Feather name="settings" size={16} color="#666" />
              </Pressable>

              <View style={styles.menuDivider} />

              {/* Opção Sair */}

              <Pressable
                style={styles.menuItem}
                onPress={handleLogout}
              >
                <Text style={[styles.menuItemText, { color: '#C0392B' }]}>Sair</Text>
                <Feather name="external-link" size={16} color="#C0392B" />
              </Pressable>

            </View>
          </>
        )}
      </View>

      <View style={styles.locationContainer}>
        <Ionicons name="location-outline" size={16} color="#666" />
        <Text style={styles.locationText}>40.000-00 Pituba</Text>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: '100%',
    zIndex: 10,
  },
  outsideClick: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 2000,
    height: 2000,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    left: 0,
    backgroundColor: '#FFF',
    borderRadius: 12,
    width: 160,
    paddingVertical: 5,
    // Sombra
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    zIndex: 1000,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 10,
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
})