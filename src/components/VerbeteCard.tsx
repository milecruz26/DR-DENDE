import savedFilledWhite from '@/assets/images/icones/saved-filled-line-white.png';
import savedWhite from '@/assets/images/icones/saved-line-white.png';
import { images } from '@/assets/images/pratos';
import defaultDishImage from '@/assets/images/pratos/VATAPÁ.png';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface VerbeteCardProps {
  id: string;
  title: string;
  description: string;
  imagem: string;
  isLiked?: boolean;
  onToggleLike?: (id: string) => void;
  showBookmark?: boolean;
}

export const VerbeteCard = ({ id, title, description, imagem, isLiked = false, onToggleLike, showBookmark = true }: VerbeteCardProps) => {
  const router = useRouter();
  const imageKey = imagem.toLowerCase().replace(/\.png$/, '');
  const imageSource = images[imageKey];
  const defaultImage = defaultDishImage;

  const handleToggle = () => {
    onToggleLike?.(id);
  };

  return (
    <Pressable
      style={styles.verbeteCard}
      onPress={() => router.push({ pathname: '/verbete', params: { id } })}
    >
      <Image
        source={imageSource || defaultImage}
        style={styles.verbeteImage}
        resizeMode="contain"
      />
      <View style={styles.verbeteContent}>
        <View style={styles.verbeteHeaderRow}>
          <Text style={styles.verbeteTitle}>{title}</Text>
          {showBookmark && (
            <Pressable onPress={handleToggle}>
              <Image
                source={isLiked ? savedFilledWhite : savedWhite}
                style={{ width: 32, height: 32 }}
              />
            </Pressable>
          )}
        </View>
        <Text style={styles.verbeteDesc} numberOfLines={4}>
          {description}
        </Text>
      </View>
    </Pressable>
  );
};


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
    width: 153,
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