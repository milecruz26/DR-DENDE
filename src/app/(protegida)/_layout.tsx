import { LinearGradient } from 'expo-linear-gradient';
import { Redirect, Slot } from 'expo-router';
// import { storage } from '@/utils/storage';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LoginLoading from '@/components/LoginLoading';
import { MockTabBar } from '@/components/MockTabBar';
import { useAuth } from '@/context/AuthContext';

export default function ProtegidaLayout() {
  const insets = useSafeAreaInsets();
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <LoginLoading visible={isLoading} />;
  if (!isAuthenticated) return <Redirect href="/(login)" />;
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  // useEffect(() => {
  //   const checkOnboarding = async () => {
  //     if (!user) return;
  //     if (user.user_type === 'common') {
  //       const hasSeen = await storage.getItem(`onboarding_${user.id}`);
  //       if (!hasSeen) {
  //         setShowOnboarding(true);
  //         await storage.setItem(`onboarding_${user.id}`, 'true');
  //       } else {
  //         setShowOnboarding(false);
  //       }
  //     } else {
  //       setShowOnboarding(false);
  //     }
  //   };
  //   checkOnboarding();
  // }, [user]);

  return (
    <>
      <View style={styles.container}>
        {/* O Slot renderiza a tela atual (index, verbete, etc.) */}
        <LinearGradient
          colors={['#FFF', '#FFF0C8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.8 }}
          style={styles.container}
        >
          <View style={styles.content}>
            <Slot />
          </View>
        </LinearGradient>

        {/* O seu Menu fica fixo aqui embaixo, fora do Slot */}
        <View style={styles.tabBarContainer}>
          <MockTabBar />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFFBE6', // Cor de fundo global
  },
  content: {
    flex: 1, // Faz o conteúdo ocupar todo o espaço acima da TabBar
  },
  tabBarContainer: {
    //  backgroundColor: 'transparent',
    // zIndex: 999,
  },
});
