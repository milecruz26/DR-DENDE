import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from '@/theme/Colors';

const { ATTENTION } = Colors;

interface CategoryChipProps {
  label: string;
}

export const CategoryChip = ({ label }: CategoryChipProps) => (
  <TouchableOpacity style={styles.chipContainer}>
    <View style={styles.dot} />
    <Text style={styles.chipText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: ATTENTION.deep, // Cor bronze/marrom claro
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
    backgroundColor: ATTENTION.lighter,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: ATTENTION.darker,
    marginRight: 6,
  },
  chipText: {
    color: ATTENTION.deeper,
    fontWeight: '400',
    fontSize: 14,
  },
});
