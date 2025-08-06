import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ForEveryLearner = () => {
  return (
    <View style={styles.container}>
      {/* Pill Tag */}
      <View style={styles.tag}>
        <Text style={styles.tagText}>For every learner</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Who we have helped</Text>

      <View style={styles.wrapper}>
        {/* Card 1 - Students */}
        <View style={styles.card}>
          <Text style={styles.title}>
            Students with Learning{' '}
            <Text style={styles.highlightGreen}>Challenges</Text>
          </Text>
          <Text style={styles.subText}>(e.g. Anxiety, Distractions, ADHD)</Text>

          <View style={styles.chipGroup}>
            <View style={[styles.chip, styles.green]}>
              <Text style={styles.chipText}>Anxiety</Text>
            </View>
            <View style={[styles.chip, styles.orange]}>
              <Text style={styles.chipText}>Distraction</Text>
            </View>
          </View>

          <View style={styles.chipGroup}>
            <View style={[styles.chip, styles.blue]}>
              <Text style={styles.chipText}>ADHD</Text>
            </View>
            <View style={[styles.chip, styles.blue]}>
              <Text style={styles.chipText}>Stress</Text>
            </View>
          </View>
        </View>

        {/* Card 2 - Parents */}
        <View style={styles.card}>
          <Text style={styles.title}>
            <Text style={styles.highlightBlue}>Parents</Text> looking for{'\n'}
            new options for their kids
          </Text>

          <View style={styles.imageCircle}>
            <Image
              source={{ uri: 'https://i.ibb.co/4JK5W7s/group-image.png' }} // Replace with your image
              style={styles.circleImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {/* Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/7973205/pexels-photo-7973205.jpeg',
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  tag: {
    backgroundColor: '#E0F2FE',
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 10,
  },
  tagText: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 12,
  },
  //   title: {
  //     fontSize: 24,
  //     fontWeight: '700',
  //     color: '#111827',
  //     marginBottom: 16,
  //     textAlign: 'center',
  //   },
  imageWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
    height: 250,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  wrapper: {
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  highlightGreen: {
    backgroundColor: '#06b6d4',
    color: '#fff',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  highlightBlue: {
    backgroundColor: '#3B82F6',
    color: '#fff',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  chipGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  chipText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  green: {
    backgroundColor: '#10b981',
  },
  orange: {
    backgroundColor: '#f97316',
  },
  blue: {
    backgroundColor: '#3b82f6',
  },
  imageCircle: {
    marginTop: 20,
    alignItems: 'center',
  },
  circleImage: {
    width: 180,
    height: 180,
  },
});

export default ForEveryLearner;
