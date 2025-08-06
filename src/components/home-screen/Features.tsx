import { BookOpen, Zap } from 'lucide-react-native';
import { Image, StyleSheet, Text, View } from 'react-native';

export const Features = () => {
  return (
    <View style={{ borderWidth: 1, borderColor: 'red' }}>
      {/* Spark Icon or animation placeholder */}
      <View style={styles.spark}>
        <Text style={styles.sparkText}>✨</Text>
      </View>
      {/* Title Text Block */}
      <Text style={styles.title}>
        AI-powered SAT and PSAT test prep to help students learn,
        <Text style={styles.highlight}> reduce </Text>
      </Text>
      <Text style={styles.title}>
        procrastination, and{' '}
        <Zap size={16} color="#f97316" style={{ marginBottom: -2 }} />
        <Text style={styles.iconHighlight}> boost </Text>
      </Text>
      <Text style={styles.title}>
        confidence{' '}
        <BookOpen size={16} color="#3B82F6" style={{ marginBottom: -2 }} />
      </Text>
      {/* Map Image with circular avatars */}
      <View style={styles.mapSection}>
        <Image
          source={{ uri: 'https://i.ibb.co/XSk4cfT/map-placeholder.png' }} // Replace with real image URL
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
    fontSize: 16,
    color: '#111827',
    textAlign: 'center',
    fontWeight: '500',
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
    height: 160,
  },
  card: {
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
