import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface VerbetesInfoProps {
  content: string;
}
export default function VerbetesInfo({ content }: VerbetesInfoProps) {
  return (
    <View>

      <Text style={styles.textContent}>
        {content || "Carregando informações..."}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({

  textContent: {
    fontSize: 16,
    color: '#454545',
    lineHeight: 26,
    textAlign: 'justify',
  },
});