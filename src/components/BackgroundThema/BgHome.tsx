import { LinearGradient } from 'expo-linear-gradient';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BannerStrip } from '../BannerStrip/BannerStrip';
import LogoCulinaria from '../Logo/Logo-culinaria';

interface BgLoginProps {
  children?: React.ReactNode;
  logo?: boolean;
  card?: boolean;
  hearder?: boolean;
}

export default function BgHome({ children, logo, card, hearder }: BgLoginProps) {
  return (
    <LinearGradient
      colors={['#FFF0C8', '#FFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        {/* <RadialBackground> */}
        <BannerStrip />
        <ScrollView>
          <View style={styles.content}>
            {/* <StatusBar style="auto" /> */}
            {hearder ?? (
              <View style={styles.logoContainer}>
                <Image source={require('../../../assets/images/logos/pnab-logo.png')} />
                <LogoCulinaria />
              </View>
            )}

            {/* <V style={styles.card}> */}

            {card ? <View style={styles.card}>{children}</View> : children}
            {logo ?? (
              <Image
                source={require('../../../assets/images/logos/apoio-financeiro-logo.png')}
                style={styles.logoApoioFinanceiro}
              />
            )}
          </View>
        </ScrollView>
        <BannerStrip />
        {/* </RadialBackground> */}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFFBE6',
    // backgroundImage: 'radial-gradient(circle at top left, #fa0303, #0308ff)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 26,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  helperText: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  buttonEntrar: {
    backgroundColor: '#3A5A40',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonEntrarText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonCriar: {
    borderWidth: 1,
    borderColor: '#3A5A40',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonCriarText: {
    color: '#3A5A40',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    textAlign: 'center',
    color: '#3A5A40',
    marginTop: 15,
    fontSize: 16,
    textDecorationLine: 'none',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#EEE',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#AAA',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#DFDFE0',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    boxShadow: '0px 1px 2px 0px rgba(25, 25, 28, 0.04)',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
    color: '#333',
  },
  logoApoioFinanceiro: {
    width: '100%',
    height: 60,
    resizeMode: 'contain',
    marginTop: 26,
    marginBottom: 26,
  },
});
