import { StyleSheet, Text, TextInput, View } from "react-native";

const COLORS = {
  primary: '#34523B',
  textDark: '#333',
  textLight: '#666',
  border: '#DDD',
  white: '#FFF',
  placeholder: '#999',
  error: '#C62828'
};

export const InputField = ({ label, required, ...props }: any) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>
      {required && <Text style={{ color: 'red' }}>*</Text>} {label}
    </Text>
    <TextInput style={styles.input} placeholderTextColor={COLORS.placeholder} {...props} />
  </View>
);

const styles = StyleSheet.create({
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 12, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 8 },
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: COLORS.textLight
  },

})