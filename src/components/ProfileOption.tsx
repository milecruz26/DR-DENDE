import { Href, Link } from 'expo-router';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Colors from '../theme/Colors';
const { SECONDARY, NEUTRAL } = Colors;
interface ProfileOptionProps {
  title: string;
  description: string;
  iconSource: ImageSourcePropType; // Tipo correto para imagens vindas do require()
  onPress?: () => void;
  href: Href;
}

export const ProfileOption = ({ title, description, iconSource, onPress, href }: ProfileOptionProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
    >
      <Link href={href} >
        {/* Círculo do Ícone com Imagem Local */}

        <Image
          source={iconSource}
          style={styles.iconImage}
          resizeMode="contain"
        />


        {/* Textos Centrais */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        {/* Seta da Direita (Se você tiver o PNG da seta, use Image aqui também) */}
        <Image
          source={require('../../assets/images/icons/arrow-curve.png')}
          style={styles.arrowIcon}
        />
      </Link>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: NEUTRAL.lighter,
    borderWidth: 1,
    borderColor: NEUTRAL.base,
    borderRadius: 8,
    padding: 16,
    // marginBottom: 24,
    width: '100%',
  },
  pressed: {
    backgroundColor: '#F9F9F9',
    borderColor: SECONDARY.dark,
  },
  iconImage: {
    width: 32,
    height: 32,

  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    color: NEUTRAL.dark,
  },
  description: {
    fontSize: 12,
    color: NEUTRAL.dark,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    opacity: 0.5,
  },
});