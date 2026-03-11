import {
  Image,
  Pressable,
  StyleSheet,
  Text
} from 'react-native';
interface EventItemProps {
  title: string;
  onPress?: () => void;
}

export const EventItem = ({ ...props }: EventItemProps) => (
  <Pressable style={styles.eventItem} onPress={props.onPress}>
    <Image source={require('../../assets/images/icones/pin-green.png')} style={{ width: 16, height: 16 }} />
    <Text style={styles.eventTitle}>{props.title}</Text>
  </Pressable>
);



const styles = StyleSheet.create({
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFAEB',
    padding: 15,
    borderRadius: 12,
    gap: 10,
    boxShadow: '0 1px 3px 0 rgba(25, 25, 28, 0.12)',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '900', // Fonte grossa estilo display
    color: '#2F4F2F',
    fontStyle: 'italic',
  },
});