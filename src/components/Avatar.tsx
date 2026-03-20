import React from 'react';
import {
  Image, StyleSheet, View
} from 'react-native';
import Colors from '../theme/Colors';

const { primary } = Colors;
type AvatarSize = "xl" | "lg" | "md" | "sm" | "xs";
type IconSize = number;

interface CustomAvatarProps {
  size?: AvatarSize;
  iconSize?: IconSize;
}

export const Avatar = ({
  size = "md", iconSize = 32 }: CustomAvatarProps) => {
  return (
    <View style={styles[size]} >

      <Image
        source={require('../../assets/images/icones/avatar-transparent.png')}
        style={{ width: iconSize, height: iconSize }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  xl: {
    width: 64, height: 64, borderRadius: 20, padding: 16, backgroundColor: primary.base
  },
  lg: {
    width: 48, height: 48, borderRadius: 20, padding: 8, backgroundColor: primary.base
  },
  md: {
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 4,
    backgroundColor: primary.base
  },
  sm: {
    width: 32, height: 32, borderRadius: 20, padding: 2, backgroundColor: primary.base
  },
  xs: {
    width: 24, height: 24, borderRadius: 20, padding: 2, backgroundColor: primary.base
  }
})