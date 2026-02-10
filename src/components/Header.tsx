import { Avatar } from '@/components/Avatar';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
export const Header = () => (
  <View style={styles.headerContainer}>
    <View >
      <Avatar />
    </View>
    <View style={styles.locationContainer}>
      <Ionicons name="location-outline" size={16} color="#666" />
      <Text style={styles.locationText}>40.000-00 Pituba</Text>
      <Ionicons name="chevron-down" size={20} color="#666" />
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  locationText: {
    color: '#666',
    fontSize: 14,
  },
})