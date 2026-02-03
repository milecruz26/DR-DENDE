import { Href, Link } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet, // Substituído para suportar o estado de pressionado
  Text,
  TextStyle
} from 'react-native';
import Colors from '../../theme/Colors';
import { FONT_SIZE } from '../../theme/Typography';

type ButtonSize = 'small' | 'medium' | 'large';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  size?: ButtonSize;
  disabled?: boolean;
  isLoading?: boolean;
  onFocus?: () => void;
  href: Href;
}
const { SECONDARY, NEUTRAL } = Colors;
export const TertiaryButton = ({
  title,
  onPress,
  onFocus,
  size = 'medium',
  disabled = false,
  isLoading = false,
  href = "/"

}: CustomButtonProps) => {

  const isButtonDisabled = disabled || isLoading;

  return (
    <Pressable
      onPress={onPress}
      onFocus={onFocus}
      disabled={isButtonDisabled}
      // A função de estilo agora lida com o estado 'pressed'
      style={({ pressed }) => [
        styles.base,
        styles[size],
        // Aplica a cor de "hover" (#1F3121 / deep) e borda apenas quando pressionado
        pressed && !isButtonDisabled && styles.isPressed,
        isButtonDisabled && styles.disabled
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={NEUTRAL.lighter} />
      ) : (
        <Link href={href}>
          <Text style={[
            styles.textBase,
            styles[`text${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles] as TextStyle
          ]}>
            {title}
          </Text>
        </Link>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: "#fff0",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    borderColor: "#fff0",
  },
  // Colunas de Tamanho
  small: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    minWidth: 100,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: 150,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
  },
  // Estado Pressionado (Equivalente ao seu isHover)
  isPressed: {
    backgroundColor: "#fff0",

    borderRadius: 8,
    boxShadow: '0px 0px 0px 2px #FDFDFD, 0px 0px 0px 4px #19233E',
    color: SECONDARY.deep,
  },
  disabled: {
    backgroundColor: '#fff0', // Sugestão de cor para o estado desativado, já que transparent sumiria com o botão
    borderColor: NEUTRAL.base,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8
  },
  textBase: {
    color: SECONDARY.dark,
    fontWeight: 400,
  },
  textSmall: { fontSize: FONT_SIZE.md },
  textMedium: { fontSize: FONT_SIZE.lg },
  textLarge: { fontSize: FONT_SIZE.lg },
});