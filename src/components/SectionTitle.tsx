import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export const SectionTitle = ({ title, showLink = false }: { title: string, showLink?: boolean }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitleText}>{title}</Text>
    {showLink && (
      <TouchableOpacity>
        <Text style={styles.linkText}>Ver todos</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 10,
    // backgroundColor: 'red'
  },
  sectionTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#454545'
  },
  linkText: {
    color: '#365d3d',
    fontSize: 16,
  },
})