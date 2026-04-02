import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '@/context/AuthContext'; // <-- Importando o contexto

export default function Configuracoes() {
  const router = useRouter();
  const { user } = useAuth(); // Pegamos o usuário logado e a função de sair

  const renderSection = (
    title: string,
    items: { label: string; badge?: number; route?: string }[],
  ) => (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>{title}</Text>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.settingItem}
          onPress={() => item.route && router.push(item.route as any)}
        >
          <View style={styles.labelContainer}>
            <Text style={styles.settingLabel}>{item.label}</Text>
            {item.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.badge.toString().padStart(2, '0')}</Text>
              </View>
            )}
          </View>
          <Feather name="corner-down-right" size={18} color="#34523B" />
        </TouchableOpacity>
      ))}
    </View>
  );

  // Se por algum motivo entrar aqui sem usuário, mostra carregando ou nulo
  if (!user) return null;
  console.log('usuario', user.user_type, user.email);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        justifyContent: 'space-between',
        minHeight: '100%',
        paddingBottom: 50,
      }}
    >
      <View>
        {/* Logo e Fechar */}
        <View style={styles.topHeader}>
          <Image
            source={require('../../../../assets/images/logos/pnab-color.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
            <Feather name="x" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <View>
          <View>
            <Text style={styles.mainTitle}>
              {user.user_type === 'common' || user.user_type === 'staff'
                ? 'Usuário'
                : 'Estabelecimento'}
            </Text>
            <View style={styles.userInfo}>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          </View>

          {/* Info do Usuário real (vem do Contexto) */}

          <View style={styles.divider} />

          {/* SEÇÕES DINÂMICAS BASEADAS EM user.role */}
          {renderSection('Configurações', [
            { label: 'Meu perfil', route: '/configuracoes/meuPerfil' },
            ...(user.user_type === 'common'
              ? [{ label: 'Denunciar', route: '/busca?tab=restaurantes' }]
              : []),
          ])}

          {(user.user_type === 'staff' || user.user_type === 'establishment') &&
            renderSection(
              'Administrar',
              user.user_type === 'staff'
                ? [
                    { label: 'Editar time', route: '/configuracoes/editarTimes' },
                    {
                      label: 'Moderar estabelecimentos',
                      badge: 1,
                      route: '/configuracoes/moderarEstabelecimentos',
                    },
                    {
                      label: 'Moderar denúncias',
                      badge: 2,
                      route: '/configuracoes/moderarDenuncias',
                    },
                  ]
                : [
                    {
                      label: 'Cupons solicitados',
                      badge: 2,
                      route: '/configuracoes/cuponsSolicitados',
                    },
                    {
                      label: 'Editar meu estabelecimento',
                      route: '/configuracoes/editarEstabelecimento',
                    },
                    { label: 'Editar galeria do cardápio', route: '/configuracoes/editarGaleria' },
                  ],
            )}

          {user.user_type === 'staff' &&
            renderSection('Adicionar', [
              { label: 'Adicionar verbete', route: '/configuracoes/adicionarVerbetePasso1' },
              { label: 'Adicionar evento', route: '/configuracoes/adicionarEvento' },
            ])}
        </View>
      </View>
      {/* Logos de Patrocínio no final */}
      {/* <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: 'blue', }}> */}
      <Image
        source={require('../../../../assets/images/logos/apoio-financeiro-colorida.png')}
        style={{ width: '100%', height: 47 }}
        resizeMode="contain"
      />
      {/* </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  userRoleText: { fontSize: 12, color: '#34523B', fontWeight: 'bold', marginTop: 4 },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 8,
  },
  logoutText: { color: '#E74C3C', fontWeight: 'bold', fontSize: 16 },
  container: { flex: 1, backgroundColor: '#FFF', height: '100%' },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  logo: { width: 110, height: 92 },
  closeBtn: { padding: 8, borderWidth: 1, borderColor: '#DDD', borderRadius: 8 },
  mainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginTop: 10,
  },

  roleSelector: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginTop: 20 },
  roleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#34523B',
    alignItems: 'center',
  },
  roleBtnActive: { backgroundColor: '#34523B' },
  roleBtnText: { color: '#34523B', fontWeight: '500' },
  roleBtnTextActive: { color: '#FFF' },

  userInfo: { padding: 20, gap: 4 },
  userLabel: { fontSize: 16, fontWeight: 'bold', color: '#444' },
  userEmail: { fontSize: 14, color: '#666' },
  divider: { height: 1, backgroundColor: '#EEE', marginHorizontal: 20, marginBottom: 10 },

  section: { paddingHorizontal: 20, marginBottom: 25 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  labelContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  settingLabel: { fontSize: 16, color: '#34523B', fontWeight: '500' },

  badge: { backgroundColor: '#E74C3C', borderRadius: 12, paddingHorizontal: 6, paddingVertical: 2 },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },

  footerLogos: { marginTop: 40, padding: 20, alignItems: 'center', justifyContent: 'center' },
});
