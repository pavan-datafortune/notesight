import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ForEveryLearner = () => {
  function secondHelpCardContent() {
    return (
      <Text style={styles.cardTitle}>
        Students preparing for <Text style={styles.orange}>standardized</Text>{' '}
        tests but don't know where to start
      </Text>
    );
  }

  function fifthHelpCardContent() {
    return (
      <Text style={styles.cardTitle}>
        <Text style={styles.highlightBlue}>Parents</Text> looking for{'\n'}
        new options for their kids
      </Text>
    );
  }

  function forthHelpCardContent() {
    return (
      <View>
        <Text style={styles.cardTitle}>
          Students with Learning{' '}
          <Text style={styles.highlightGreen}>Challenges</Text>
        </Text>
        <Text style={styles.subText}>(e.g. Anxiety, Distractions, ADHD)</Text>

        <View
          style={{
            width: '100%',
            flexDirection: 'column',
            gap: 16,
            paddingTop: 20,
          }}
        >
          <View style={styles.chipGroup}>
            <View style={[styles.chip, styles.green]}>
              <Text style={styles.chipText}>Anxiety</Text>
            </View>
            <View style={[styles.chip, styles.orange]}>
              <Text style={styles.chipText}>Distraction</Text>
            </View>
            <View style={{ display: 'flex' }} />
          </View>

          <View style={styles.chipGroup}>
            <View style={{ display: 'flex' }} />
            <View style={[styles.chip, styles.blue]}>
              <Text style={styles.chipText}>ADHD</Text>
            </View>
            <View style={[styles.chip, styles.blue]}>
              <Text style={styles.chipText}>Stress</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* Pill Tag */}
      <View style={styles.badge}>
        <Text style={styles.tagText}>For every learner</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Who we have helped</Text>

      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 25,
        }}
      >
        <CustomCards
          backgroundImageURL={require('../../assets/help-section-1.png')}
        />

        <CustomCards
          backgroundImageURL={require('../../assets/help-section-2.png')}
          content={secondHelpCardContent}
        />

        <CustomCards
          backgroundImageURL={require('../../assets/help-section-3.png')}
        />

        <CustomCards content={forthHelpCardContent} />

        <CustomCards
          imageResizeMode={'contain'}
          imageHeight={'80%'}
          backgroundImageURL={require('../../assets/help-section-5.png')}
          content={fifthHelpCardContent}
        />
      </View>
    </View>
  );
};

export default ForEveryLearner;

const CustomCards = ({
  imageHeight = '100%',
  imageResizeMode = 'cover',
  backgroundImageURL,
  content,
}: any) => {
  return (
    <View style={styles.card}>
      {backgroundImageURL && (
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            height: '100%',
          }}
        >
          <Image
            source={backgroundImageURL}
            style={{
              width: '100%',
              height: imageHeight,
              borderRadius: 8,
            }}
            resizeMode={imageResizeMode}
          />
        </View>
      )}

      {content && (
        <View
          style={{
            position: 'absolute',
            margin: 15,
            width: '100%',
          }}
        >
          {content()}
        </View>
      )}
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
  badge: {
    backgroundColor: '#3b82f6',
    color: 'white',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  tagText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 12,
  },
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    height: 300,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
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
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 5,
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
