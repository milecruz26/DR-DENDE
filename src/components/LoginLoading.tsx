import React from 'react';
import { Image, Modal, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BannerStrip } from './BannerStrip/BannerStrip';

export default function LoginLoading({ visible }: { visible: boolean }) {
  return (
    <Modal transparent visible={visible} animationType="fade">


      <SafeAreaView style={styles.container}>

        <BannerStrip />

        <View style={styles.content}>
          <Image source={require('../../assets/images/logos/pnab-logo.png')} />


          <Image source={require('../../assets/images/logos/brand-G.png')} style={styles.logo} />



          <Image source={require('../../assets/images/logos/apoio-financeiro-logo.png')} style={styles.logoApoioFinanceiro} />

        </View>

        <BannerStrip />

      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 293,
    height: 177
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFBE6',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  logoApoioFinanceiro: {
    width: '100%',
    height: 60,
    resizeMode: 'contain',
    marginTop: 26,
    marginBottom: 26

  }
});
