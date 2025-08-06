import { Image, StyleSheet, Text, View } from 'react-native';
import { Zap, ThumbsUp } from 'lucide-react-native';

export const Features = () => {
  return (
    <View style={{ display: 'flex', alignItems: 'center' }}>
      {/* Spark Icon or animation placeholder */}
      <View style={styles.spark}>
        <Text style={styles.sparkText}>✨</Text>
      </View>
      {/* Title Text Block */}
      <Text style={styles.title}>
        AI-powered SAT and PSAT test prep to help students learn,{' '}
        <Text style={styles.highlight}> reduce </Text>
      </Text>
      <Text style={styles.title}>
        procrastination, and{' '}
        <View
          style={{
            marginBottom: -2,
            backgroundColor: '#f97316',
            padding: 3,
            borderRadius: 5,
          }}
        >
          <Zap strokeWidth={3} size={12} color="#fff" />
        </View>
        <Text style={styles.iconHighlight}> boost </Text>
      </Text>
      <Text style={styles.title}>
        confidence{' '}
        <View
          style={{
            marginBottom: -2,
            backgroundColor: '#3B82F6',
            padding: 3,
            borderRadius: 5,
          }}
        >
          <ThumbsUp strokeWidth={4} size={12} color="#fff" />
        </View>
      </Text>
      {/* Map Image with circular avatars */}
      <View style={styles.mapSection}>
        <Image
          source={require('../../assets/globe.png')}
          style={styles.mapImage}
          resizeMode="contain"
        />
      </View>
      {/* Schools Card */}
      <View style={styles.card}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Used by students in</Text>
        </View>
        <Text style={styles.cardText}>Over 35+ schools</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  spark: {
    marginBottom: 10,
  },
  sparkText: {
    fontSize: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  highlight: {
    backgroundColor: '#f97316',
    color: '#fff',
    borderRadius: 4,
    paddingHorizontal: 4,
  },
  iconHighlight: {
    color: '#f97316',
    fontWeight: '700',
  },
  mapSection: {
    marginVertical: 24,
    width: '100%',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: 280,
  },
  card: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#f9fafb',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  tag: {
    backgroundColor: '#3B82F6',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
  tagText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  cardText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
});

export default Features;
