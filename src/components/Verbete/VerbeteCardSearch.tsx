// src/components/Verbete/VerbeteCardSearch.tsx
import { images } from '@/assets/images/pratos';
import defaultDishImage from '@/assets/images/pratos/VATAPÁ.png';
import Colors from "@/theme/Colors";
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export interface VerbeteCardProps {
  id: string;
  title: string;
  desc: string;
  img: string;
  index: number;
  favoritosPage?: boolean;
  isLiked?: boolean;
  onToggleLike?: (id: string) => void;
  showBookmark?: boolean;
}
const { SECONDARY, TERTIARY } = Colors


SECONDARY.lighter
export const VerbeteCardSearch = ({
  id,
  title,
  desc,
  img,
  index,
  favoritosPage,
  isLiked = false,
  onToggleLike,
  showBookmark = true,
}: VerbeteCardProps) => {
  const router = useRouter();
  const backgroundColor = index % 2 === 0 ? TERTIARY.light : SECONDARY.light;
  const borderColor = index % 2 === 0 ? TERTIARY.dark : 'transparent';

  const imageKey = img?.toLowerCase?.().replace(/\.png$/, '');
  const imageSource = images[imageKey];
  const defaultImage = defaultDishImage;

  const handleToggle = () => {
    onToggleLike?.(id);
  };

  return (
    <Pressable
      style={[styles.verbeteCard, { backgroundColor, borderColor }]}
      onPress={() => router.push({ pathname: '/verbete', params: { id } })}
    >
      <Image source={imageSource || defaultImage} style={styles.verbeteImage} resizeMode="contain" />
      <View style={styles.verbeteInfo}>
        <Text style={styles.verbeteTitle}>{title}</Text>
        <Text style={styles.verbeteDesc} numberOfLines={2}>{desc}</Text>
      </View>

      <View style={{ alignItems: 'center' }}>
        <Pressable style={styles.bookmarkIcon} onPress={handleToggle}>
          <Image
            source={
              isLiked
                ? require('../../../assets/images/icones/saved-filled-line-neutral.png')
                : require('../../../assets/images/icones/saved-line-neutral.png')
            }
            style={{ width: 32, height: 32 }}
          />
        </Pressable>
        {favoritosPage && (
          <Pressable>
            <Image
              source={require('../../../assets/images/icones/tres-pontos-line-black.png')}
              style={{ width: 32, height: 32 }}
            />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
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