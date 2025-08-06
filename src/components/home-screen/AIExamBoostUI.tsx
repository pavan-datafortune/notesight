import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const AIExamBoostUI = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Card */}
      <View style={styles.card}>
        <Text style={styles.headerText}>
          Want to boost your <Text style={styles.highlight}>standardized</Text>{' '}
          exam score with AI?
        </Text>
        <Text style={styles.subText}>
          Personalized, Efficient, Affordable Learning.{'\n'}Get 24/7 help when
          you need it.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      {/* Feature Tags */}
      <View style={styles.featureContainer}>
        <View style={[styles.tag, styles.blueTag]}>
          <Text style={styles.tagText}>available 24/7</Text>
        </View>
        <View style={[styles.tag, styles.greenTag]}>
          <Text style={styles.tagText}>personalized</Text>
        </View>
        <View style={[styles.tag, styles.orangeTag]}>
          <Text style={styles.tagText}>affordable</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F7F9FC',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    elevation: 3,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B1C1E',
    marginBottom: 10,
  },
  highlight: {
    backgroundColor: '#FFF176',
    fontWeight: '700',
  },
  subText: {
    fontSize: 14,
    color: '#6E6E6E',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  featureContainer: {
    alignItems: 'center',
    gap: 10,
  },
  tag: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    elevation: 2,
    shadowColor: '#000',
  },
  blueTag: {
    backgroundColor: '#4A90E2',
  },
  greenTag: {
    backgroundColor: '#34C759',
  },
  orangeTag: {
    backgroundColor: '#FF9500',
  },
  tagText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default AIExamBoostUI;
