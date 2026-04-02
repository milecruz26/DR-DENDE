const FOOD_IMAGES = [
  require('../../../assets/images/icons/linguica.png'),
  require('../../../assets/images/icons/carne.png'),
  require('../../../assets/images/icons/camarao.png'),
  require('../../../assets/images/icons/sal.png'),
  require('../../../assets/images/icons/cebola.png'),
  require('../../../assets/images/icons/coco.png'),
  require('../../../assets/images/icons/dende.png'),
  require('../../../assets/images/icons/leite-coco.png'),
];

import React from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';

const ITEM_SIZE = 40;

export const BannerStrip = () => {
  const { width: screenWidth } = useWindowDimensions();

  // Calculamos quantos itens são necessários para cobrir a largura da tela (e um pouco mais para garantir)
  const numberOfItems = Math.ceil(screenWidth / ITEM_SIZE) + 1;

  const getBackgroundColor = (index: number) => {
    // No código, o índice começa em 0.
    // Na sua lista, Imagem 1 (índice 0) é transparente, Imagem 2 (índice 1) tem cor.

    // Se o índice for PAR (0, 2, 4...), fundo transparente
    if (index % 2 === 0) {
      return 'transparent';
    }

    // Se o índice for ÍMPAR, verificamos o ciclo de 12 para escolher a cor
    const positionInCycle = index % 12;

    // Posições ímpares do ciclo: 1, 3, 5 (as 3 primeiras com cor) -> Laranja
    if (positionInCycle === 1 || positionInCycle === 3 || positionInCycle === 5) {
      return '#E77A1B';
    }

    // Posições ímpares do ciclo: 7, 9, 11 (as outras 3 com cor) -> Verde
    return '#3A6037';
  };

  // Criamos um array com essa quantidade, repetindo as imagens do padrão
  const itemsToRender = Array.from({ length: numberOfItems }).map((_, index) => {
    return FOOD_IMAGES[index % FOOD_IMAGES.length];
  });

  return (
    <View style={styles.container}>
      {Array.from({ length: numberOfItems }).map((_, index) => (
        <View
          key={index}
          style={[styles.itemWrapper, { backgroundColor: getBackgroundColor(index) }]}
        >
          <Image
            source={FOOD_IMAGES[index % FOOD_IMAGES.length]}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Alinha as imagens horizontalmente
    width: '100%',
    height: ITEM_SIZE,
    overflow: 'hidden', // Garante que o que sobrar da última imagem não quebre o layout
  },
  itemWrapper: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
  },
});
