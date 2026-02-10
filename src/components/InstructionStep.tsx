import Colors from '@/theme/Colors';
import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const { SECONDARY } = Colors

export const InstructionStep = ({ number, text }: any) => (
  <View style={styles.stepContainer}>
    <View style={styles.stepCircle}>
      <Text style={styles.stepNumber}>{number}</Text>
    </View>
    <Text style={styles.stepText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    // paddingRight: 24,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: SECONDARY.dark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginTop: 2,
  },
  stepNumber: {
    color: '#FFF',
    fontSize: 16,
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
});