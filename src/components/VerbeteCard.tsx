import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

interface VerbeteCardProps {
  title: string;
  description: string;
}

export const VerbeteCard = ({ title, description }: VerbeteCardProps) => (
  <View style={styles.verbeteCard}>
    <Image
      source={require('../../assets/images/pratos/feijoada.png')}
      style={styles.verbeteImage}
    />
    <View style={styles.verbeteContent}>
      <View style={styles.verbeteHeaderRow}>
        <Text style={styles.verbeteTitle}>{title}</Text>
        <Image source={require('../../assets/images/icones/saved-line-white.png')} style={{ width: 32, height: 32 }} />
        {/* <Feather name="bookmark" size={20} color="#FFF" /> */}
      </View>
      <Text style={styles.verbeteDesc} numberOfLines={4}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  verbeteCard: {
    backgroundColor: '#E87C38',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
    width: 308,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 15,

  },
  verbeteImage: {
    width: 107,
    height: 82,

  },
  verbeteContent: {
    // flex: 1,
    width: 153
  },
  verbeteHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  verbeteTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFF',
    fontStyle: 'italic',
  },
  verbeteDesc: {
    color: '#FFF',
    fontSize: 12,
    width: '100%',
    wordWrap: 'break-word',
  },
});

