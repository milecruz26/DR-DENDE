import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Feather } from '@expo/vector-icons';
export const DateSelector = () => (
  <View style={styles.dateSelectorRow}>
    <TouchableOpacity style={styles.arrowButton}>
      <Feather name="chevron-left" size={24} color={'#2F4F2F'} />
    </TouchableOpacity>

    <View style={styles.dateItem}>
      <Text style={styles.dateText}>27/Dez</Text>
    </View>

    <View style={[styles.dateItem, styles.dateItemSelected]}>
      <Text style={[styles.dateText, styles.dateTextSelected]}>25/Dez</Text>
    </View>

    <View style={styles.dateItem}>
      <Text style={styles.dateText}>26/Dez</Text>
    </View>

    <TouchableOpacity style={styles.arrowButton}>
      <Feather name="chevron-right" size={24} color={'#2F4F2F'} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  dateSelectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F2E8D5',
    borderRadius: 12,
    padding: 10,
    // marginBottom: 15,
  },
  arrowButton: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
  },
  dateItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  dateItemSelected: {
    backgroundColor: '#2F4F2F',
  },
  dateText: {
    color: '#2F4F2F',
    fontWeight: 'bold',
  },
  dateTextSelected: {
    color: '#FFF',
  },
});