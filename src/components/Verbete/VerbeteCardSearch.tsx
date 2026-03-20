import Colors from "@/theme/Colors";
import { useRouter } from 'expo-router';
import { useState } from "react";
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";

export interface VerbeteCardProps {

  id: string;
  title: string;
  desc: string;
  bg?: string;
  img: ImageSourcePropType; // <-- Este é o tipo correto para imagens locais no Expo/React Native

  index: number;
  favoritos?: boolean;
}
const { SECONDARY, TERTIARY } = Colors


SECONDARY.lighter
export const VerbeteCardSearch = ({ index, favoritos, id, title, desc, bg, img }: VerbeteCardProps) => {
  const router = useRouter();
  const backgroundColor = index % 2 === 0 ? TERTIARY.light : SECONDARY.light;
  const borderColor = index % 2 === 0 ? TERTIARY.dark : 'transparent';
  const [isSaved, setIsSaved] = useState(false);
  const toggleSave = () => {
    setIsSaved(!isSaved);
  };
  return (
    // <View style={styles.verbeteCard}>
    <Pressable
      style={[styles.verbeteCard, { backgroundColor, borderColor }]}
      onPress={() => router.push({ pathname: '/verbete', params: { id: id } })}
    >
      <Image source={img} style={styles.verbeteImage} resizeMode="contain" />
      <View style={styles.verbeteInfo}>
        <Text style={styles.verbeteTitle}>{title}</Text>
        <Text style={styles.verbeteDesc} numberOfLines={2}>{desc}</Text>
      </View>

      <View style={{ alignItems: 'center' }}>
        <Pressable style={styles.bookmarkIcon} onPress={toggleSave}>
          <Image
            source={
              isSaved
                ? require('../../../assets/images/icones/saved-filled-line-neutral.png')
                : require('../../../assets/images/icones/saved-line-neutral.png')
            } style={{ width: 32, height: 32 }} />
        </Pressable>
        {favoritos &&

          <Pressable>
            <Image
              source={require('../../../assets/images/icones/tres-pontos-line-black.png')}
              style={{ width: 32, height: 32 }}
            />
          </Pressable>
        }
      </View>
    </Pressable>
  )
};

const styles = StyleSheet.create({
  verbeteCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    height: 100,
    borderWidth: 1

  },
  verbeteCardBgTertiary: {
    backgroundColor: TERTIARY.light,
    borderColor: TERTIARY.dark,
  },
  verbeteCardBgSecondary: {
    backgroundColor: SECONDARY.light,
  },
  verbeteImage: {
    width: 80,
    height: 80,
    marginRight: 12,
  },
  verbeteInfo: {
    flex: 1,
    marginRight: 10,
  },
  verbeteTitle: {
    fontSize: 18, // Fonte estilo "Passarinha"
    color: '#2C2C2C',
    marginBottom: 4,
    textTransform: 'uppercase',
    fontFamily: "OfertaDoDia"
  },
  verbeteDesc: {
    fontSize: 12,
    color: '#2C2C2C',
    lineHeight: 16,
  },
  bookmarkIcon: {
    padding: 5,
  },
});