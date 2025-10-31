import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, Platform, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import Slider from '@react-native-community/slider';

export default function App() {
  const [image, setImage] = useState(null);
  const [previewUri, setPreviewUri] = useState(null);
  const [settings, setSettings] = useState({ brightness: 1, contrast: 1, saturate: 1, rotate: 0 });

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permissão negada', 'Precisamos de acesso às suas fotos.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 1 });
    if (!result.canceled) {
      setImage(result.assets[0]);
      setPreviewUri(result.assets[0].uri);
    }
  }

  async function exportImage() {
    if (!image) return;
    const manipResult = await ImageManipulator.manipulateAsync(image.uri, [], { compress: 1, format: ImageManipulator.SaveFormat.PNG });
    if (Platform.OS === 'web') return;
    if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(manipResult.uri);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Editor Mobile</Text>
        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.btn} onPress={pickImage}><Text>Upload</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={exportImage}><Text>Exportar</Text></TouchableOpacity>
        </View>
        <View style={styles.previewBox}>
          {previewUri ? <Image source={{ uri: previewUri }} style={styles.previewImage} resizeMode="contain" /> : <Text>Nenhuma imagem</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  content: { padding: 16, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  controlsRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  btn: { padding: 10, backgroundColor: '#fff', borderRadius: 8, marginHorizontal: 6, elevation: 2 },
  previewBox: { width: '100%', height: 360, backgroundColor: '#fff', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  previewImage: { width: '100%', height: '100%' },
});
