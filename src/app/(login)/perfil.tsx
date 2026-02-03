import BgLogin from "@/components/BackgroundThema/BgLogin";
import { ProfileOption } from "@/components/ProfileOption";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Perfil() {
  return (
    <BgLogin>
      <Text style={styles.cardTitle}>Qual é o seu perfil?</Text>
      <Text style={styles.cardSubTitle}>Escolha a opção que melhor descreve você para personalizar sua experiência</Text>

      <View style={{ gap: 24 }}>

        <ProfileOption
          title="Pessoa Física"
          description="Para uso pessoal"
          iconSource={require('../../../assets/images/icons/pessoa-fisica.png')}
          href={"/"}

          onPress={() => {

          }}
        />
        <ProfileOption
          title="Estabelecimento"
          description="Para empresas e negócios"
          iconSource={require('../../../assets/images/icons/estabelecimento.png')}
          onPress={() => {
          }}
          href={"/(login)/cadastro"}
        />

      </View>
    </BgLogin>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBE6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,

  },
  logoSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A5A40',
    fontStyle: 'italic',
  },

  card: {
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: 16,
    padding: 24,
    marginTop: 24,
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
  cardSubTitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  helperText: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },

});
