import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { RouteStackParamList } from '../../route/Route';
import { useNavigation } from '@react-navigation/native';

export default function HorizontalButtons() {
  type NavigationProp = NativeStackNavigationProp<RouteStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  const buttons: { label: string; screen: keyof RouteStackParamList }[] = [
    { label: 'Study Guide', screen: 'Flash Cards' },
    { label: 'Flash Cards', screen: 'Flash Cards' },
    { label: 'Transcripts', screen: 'Flash Cards' },
    { label: 'Practice Tests', screen: 'Flash Cards' },
    { label: 'Translation', screen: 'Flash Cards' },
  ];

  return (
    <View style={{ paddingVertical: 20 }}>
      <ScrollView
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {buttons.map((btn, index) => (
          <TouchableOpacity key={index} style={styles.button}>
            <Text style={styles.buttonText}>{btn.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginRight: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
