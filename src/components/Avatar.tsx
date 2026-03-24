import { useAuth } from '@/context/AuthContext';
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
  size = "md" }: CustomAvatarProps) => {
  const { user } = useAuth();
  const avatarUri = user?.avatar;
  return (
    <View style={styles[size]} >
      {avatarUri ? (
        // <View style={{ width: "100%", height: iconSize, borderRadius: 50, backgroundColor: 'red', }}>
        <Image source={{ uri: avatarUri }} style={{ width: "100%", height: "100%", borderRadius: 50 }} />
        // </View>
      ) :
        <Image
          source={require('../../assets/images/icones/avatar-transparent.png')}
          style={{ width: "100%", height: "100%", backgroundColor: primary.base }}
        />}
    </View>
  )
}

const styles = StyleSheet.create({
  xl: {
    width: 64, height: 64, borderRadius: 20, padding: 16,
  },
  lg: {
    width: 48, height: 48, borderRadius: 20, padding: 8,
  },
  md: {
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 4,

  },
  sm: {
    width: 32, height: 32, borderRadius: 20, padding: 2
  },
  xs: {
    width: 24, height: 24, borderRadius: 20, padding: 2,
  }
})