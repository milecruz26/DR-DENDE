import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
interface EventItemProps {
  title: string;
}

export const EventItem = ({ title }: EventItemProps) => (
  <View style={styles.eventItem}>
    <MaterialCommunityIcons name="bullhorn-outline" size={20} color={'#2F4F2F'} />
    <Text style={styles.eventTitle}>{title}</Text>
  </View>
);



const styles = StyleSheet.create({
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2E8D5',
    padding: 15,
    borderRadius: 12,
    gap: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '900', // Fonte grossa estilo display
    color: '#2F4F2F',
    fontStyle: 'italic',
  },
});