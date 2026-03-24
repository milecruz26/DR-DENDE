import { images } from '@/assets/images/pratos';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Colors from '@/theme/Colors';
const { primary } = Colors;

interface IngredientItemProps {
  name: string;
  iconFallback?: string;
  color?: string;
  ingredientPath: string;
}

const INGREDIENT_ICONS: Record<string, ImageSourcePropType> = {
  'dende': require('../../assets/images/icons/dende.png'),
  'manteiga': require('../../assets/images/icons/manteiga.png'),
  'sal': require('../../assets/images/icons/sal.png'),
  'pimentao': require('../../assets/images/icons/pimentao.png'),
};

export const IngredientItem = ({ name, iconFallback, color, ingredientPath }: IngredientItemProps) => {

  const imageKey = ingredientPath.toLowerCase().replace(/\.png$/, '');
  const imageSource = images[imageKey];
  const defaultImage = require('@/assets/images/pratos/VATAPÁ.png');
  return (
    <View style={styles.ingredientContainer}>
      <View
        style={styles.ingredientCircle}
      // style={[styles.ingredientCircle, { backgroundColor: color || '#E87C38' }]}
      >
        {imageSource ? (
          <Image
            source={imageSource}
            style={{ width: 40, height: 40 }} // É bom definir tamanho para ícones
            resizeMode="contain"
          />
        ) : (
          // Fallback caso a imagem não exista no mapa ou o caminho esteja errado
          <Text style={{ fontSize: 10, color: '#FFF' }}>{iconFallback || '?'}</Text>
        )}
        {/* {iconFallback ? (
        <Text style={{ fontSize: 10, color: '#FFF' }}>{iconFallback}</Text>
      ) : (
        <MaterialCommunityIcons name="food-steak" size={24} color="#FFF" />
      )} */}
      </View>
      <Text style={styles.ingredientText}>{name}</Text>
    </View>
  )
};

const styles = StyleSheet.create({

  ingredientContainer: {
    alignItems: 'center',
    marginRight: 8,
    width: 80,


  },
  ingredientCircle: {
    width: 76,
    height: 76,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 9,
    borderWidth: 2,
    borderColor: '#F3F4F6',
    backgroundColor: primary.dark
  },
  ingredientText: {
    fontSize: 14,
    color: '#4A5565',
    textAlign: 'center',
    letterSpacing: 0.28
    // lineHeight: 14,
  },
});