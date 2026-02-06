import { Image, StyleSheet, Text, View } from 'react-native';

import BgLogin from '@/components/BackgroundThema/BgLogin';
import React from 'react';

import { PrimaryButton } from '@/components/Buttons/PrimaryButton';
import Colors from '../../theme/Colors';
const { NEUTRAL } = Colors;


export default function Abertura() {

  return (
    <>
      <BgLogin card={false} hearder={false}>
        <Image source={require('../../../assets/images/logos/pnab-logo.png')} />
        <Image source={require('../../../assets/images/logos/Brand.png')} style={styles.logoApoioFinanceiro} />
        <Text style={styles.cardTitle}>Descubra a autêntica culinária afro baiana na palma da sua mão</Text>

        <View>


          <View style={styles.container}>
            <Image source={require('../../../assets/images/icones/tigela-laranja.png')} style={styles.containerImage} />
            <View>
              <Text style={styles.title}>Pratos Tradicionais</Text>
              <Text style={styles.subtitle}>Acarajé, vatapá, caruru e muito mais</Text>
            </View>
          </View>

          <View style={styles.container}>
            <Image source={require('../../../assets/images/icones/chef-laranja.png')} style={styles.containerImage} />
            <View>
              <Text style={styles.title}>Receitas Ancestrais</Text>
              <Text style={styles.subtitle}>Tradições passadas de geração em geração</Text>
            </View>
          </View>

          <View style={styles.container}>
            <Image source={require('../../../assets/images/icones/loja-laranja.png')} style={styles.containerImage} />
            <View>
              <Text style={styles.title}>Estabelecimentos Locais</Text>
              <Text style={styles.subtitle}>Conecte-se com quem preserva a cultura</Text>
            </View>
          </View>

          <PrimaryButton
            onPress={() => { }}
            title='Começar Jornada Culinária'

          />

        </View>
      </BgLogin>
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    width: '100%',
    gap: 12
  },
  cardTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: NEUTRAL.darker,
    marginBottom: 20,
  },
  logoApoioFinanceiro: {
    width: '100%',
    height: 60,
    resizeMode: 'contain',
    marginTop: 26,
    marginBottom: 26

  },
  containerImage: {
    width: 32,
    height: 32
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: NEUTRAL.deep
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: "#6A7282"
  }
})