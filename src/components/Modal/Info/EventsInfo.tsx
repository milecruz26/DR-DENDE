import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SecondaryButton } from '@/components/Buttons/SecondaryButton';

interface EventsInfoProps {
  description: string;
  date: string;
  location: string;
}

export default function EventsInfo({ ...props }: EventsInfoProps) {
  return (
    <View style={styles.scrollContent}>
      <View style={styles.containerInfo}>
        <Text style={styles.highlightTitle}>Sobre o evento</Text>
        <Text style={styles.textContent}>{props.description}</Text>
      </View>

      <View style={styles.containerInfo}>
        <Text style={styles.highlightTitle}>Informações do evento</Text>
        <Text style={styles.textContent}>{props.date}</Text>
      </View>

      <View style={styles.containerInfo}>
        <Text style={styles.highlightTitle}>Localização</Text>
        <Image source={require('../../../../assets/mock/map.png')} />
        <Text style={styles.textContent}>{props.location}</Text>
      </View>
      <SecondaryButton onPress={() => {}} title="Ver lista de eventos" size="small" />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 24,
    gap: 24,
  },
  textContent: {
    fontSize: 16,
    color: '#454545',
    lineHeight: 26,
    textAlign: 'justify',
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#191919',
  },
  containerInfo: {
    gap: 16,
  },
});
