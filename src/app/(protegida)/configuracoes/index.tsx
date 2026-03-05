import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type UserRole = 'usuario' | 'equipe' | 'estabelecimento';

export default function Configuracoes() {
  const [role, setRole] = useState<UserRole>('usuario');
  const router = useRouter();

  const renderSection = (title: string, items: { label: string, badge?: number, route?: string }[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>{title}</Text>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.settingItem}
          // Se o item tiver uma rota, ele navega para ela ao clicar
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

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Logo e Fechar */}
      <View style={styles.topHeader}>
        <Image source={require('../../../../assets/images/logos/pnab-logo.png')} style={styles.logo} resizeMode="contain" />
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <Feather name="x" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <Text style={styles.mainTitle}>Tipos de acesso de configuração</Text>

      {/* Seletor de Tipo (Botões conforme imagem) */}
      <View style={styles.roleSelector}>
        {(['usuario', 'equipe', 'estabelecimento'] as UserRole[]).map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.roleBtn, role === r && styles.roleBtnActive]}
            onPress={() => setRole(r)}
          >
            <Text style={[styles.roleBtnText, role === r && styles.roleBtnTextActive]}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Info do Usuário */}
      <View style={styles.userInfo}>
        <Text style={styles.userLabel}>Usuário</Text>
        <Text style={styles.userEmail}>user@drdende.com.br</Text>
      </View>

      {/* SEÇÕES DINÂMICAS POR ROLE */}
      <View style={styles.divider} />

      {/* Aqui adicionamos a rota para a página de perfil */}
      {renderSection('Configurações', [
        { label: 'Meu perfil', route: '/configuracoes/meuPerfil' },
        ...(role === 'usuario' ? [{ label: 'Denunciar', route: '/configuracoes/denunciar' }] : [])
      ])}

      {(role === 'equipe' || role === 'estabelecimento') && renderSection('Administrar',
        role === 'equipe' ? [
          { label: 'Editar time', route: '/configuracoes/editarTimes' },
          { label: 'Moderar estabelecimentos', badge: 1, route: '/configuracoes/moderarEstabelecimentos' },
          { label: 'Moderar denúncias', badge: 2, route: '/configuracoes/moderarDenuncias' },
        ] : [
          { label: 'Cupons solicitados', badge: 2, route: '/configuracoes/cuponsSolicitados' },
          { label: 'Editar meu estabelecimento', route: '/configuracoes/editarEstabelecimento' },
          { label: 'Editar galeria do cardápio', route: '/configuracoes/editarGaleria' },
        ]
      )}

      {role === 'equipe' && renderSection('Adicionar', [
        { label: 'Adicionar verbete', route: '/configuracoes/adicionarVerbetePasso1' },
        { label: 'Adicionar evento', route: '/configuracoes/adicionarEvento' },
      ])}

      {/* Logos de Patrocínio no final */}
      <View style={styles.footerLogos}>
        {/* Adicionar suas imagens de marcas aqui */}
        <Text style={{ fontSize: 10, color: '#999' }}>Apoio Financeiro / Governo / PNAB</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginTop: 20 },
  logo: { width: 100, height: 50 },
  closeBtn: { padding: 8, borderWidth: 1, borderColor: '#DDD', borderRadius: 8 },
  mainTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', paddingHorizontal: 20, marginTop: 10 },

  roleSelector: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginTop: 20 },
  roleBtn: { flex: 1, paddingVertical: 12, borderRadius: 8, borderWidth: 1, borderColor: '#34523B', alignItems: 'center' },
  roleBtnActive: { backgroundColor: '#34523B' },
  roleBtnText: { color: '#34523B', fontWeight: '500' },
  roleBtnTextActive: { color: '#FFF' },

  userInfo: { padding: 20, gap: 4 },
  userLabel: { fontSize: 16, fontWeight: 'bold', color: '#444' },
  userEmail: { fontSize: 14, color: '#666' },
  divider: { height: 1, backgroundColor: '#EEE', marginHorizontal: 20, marginBottom: 10 },

  section: { paddingHorizontal: 20, marginBottom: 25 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
  labelContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  settingLabel: { fontSize: 16, color: '#34523B', fontWeight: '500' },

  badge: { backgroundColor: '#E74C3C', borderRadius: 12, paddingHorizontal: 6, paddingVertical: 2 },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },

  footerLogos: { marginTop: 40, padding: 20, alignItems: 'center', opacity: 0.6 }
});