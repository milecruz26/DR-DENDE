import Colors from '@/theme/Colors';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
const { TERTIARY } = Colors;

export interface InfoPillProps {
  categoria: string;
  tempo: string;
  dificuldade: string;
}

export const InfoPill = ({ categoria, tempo, dificuldade }: InfoPillProps) => (
  <View style={styles.infoPillContainer}>
    <View style={styles.infoItem}>
      <Text style={styles.infoTextBold}>{categoria}</Text>
    </View>
    {/* <View style={styles.infoSeparator} /> */}

    <View style={styles.infoItemRight}>
      <View style={styles.infoItem}>
        <Feather name="clock" size={14} color={'#2C2C2C'} />
        <Text style={styles.infoText}>{tempo}</Text>
      </View>

      <View style={styles.infoItem}>
        <Feather name="alert-triangle" size={14} color={'#2C2C2C'} />
        <Text style={styles.infoText}>{dificuldade}</Text>
      </View>
    </View>
  </View>
);


const styles = StyleSheet.create({
  infoPillContainer: {
    flexDirection: 'row',
    backgroundColor: TERTIARY.light,
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: TERTIARY.dark,
    // marginTop: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  infoItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  infoSeparator: {
    width: 1,
    height: '100%',
    backgroundColor: '#D1B980',
  },
  infoTextBold: {
    fontWeight: 'bold',
    color: '#2C2C2C',
    fontSize: 14,
  },
  infoText: {
    color: '#2C2C2C',
    fontSize: 14,
  },
});