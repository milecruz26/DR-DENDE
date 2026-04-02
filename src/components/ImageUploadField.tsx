import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const COLORS = {
  primary: '#34523B',
  white: '#FFFFFF',
  textLight: '#666666',
  border: '#CCCCCC',
  danger: '#D32F2F',
  uploadBg: '#FAFAFA',
};

interface ImageUploadFieldProps {
  imageUri: string | null;
  onPickImage: () => void;
  onRemoveImage: () => void;
}

export default function ImageUploadField({
  imageUri,
  onPickImage,
  onRemoveImage,
}: ImageUploadFieldProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.uploadArea, imageUri && { borderColor: COLORS.primary }]}
        onPress={onPickImage}
      >
        {imageUri ? (
          <>
            <Feather name="image" size={20} color={COLORS.primary} />
            <Text style={styles.selectedText}>Imagem selecionada!</Text>
          </>
        ) : (
          <>
            <Feather name="upload" size={20} color={COLORS.textLight} />
            <Text style={styles.uploadText}>Clique para selecionar uma imagem</Text>
          </>
        )}
      </TouchableOpacity>
      {imageUri && (
        <TouchableOpacity style={styles.deleteBtn} onPress={onRemoveImage}>
          <Feather name="x-circle" size={22} color={COLORS.danger} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 24 },
  uploadArea: {
    flex: 1,
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.uploadBg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  uploadText: { fontSize: 14, color: COLORS.textLight },
  selectedText: { color: COLORS.primary, fontWeight: '500' },
  deleteBtn: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.danger,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
