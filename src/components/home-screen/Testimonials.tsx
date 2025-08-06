import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';

const TestimonialSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.badge}>Testimonials</Text>

      <Text style={styles.title}>
        What <Text style={styles.highlighted}>people</Text> are{'\n'}saying
      </Text>

      <View style={styles.card}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
          style={styles.avatar}
        />

        <Text style={styles.name}>Noah, Undergraduate</Text>
        <Text style={styles.school}>University of Michigan</Text>

        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, idx) => (
            <Text key={idx} style={styles.star}>
              ⭐
            </Text>
          ))}
          <Text style={styles.rating}>5.0</Text>
        </View>

        <Text style={styles.quote}>
          "For the PSAT, I used Notesight’s flashcards and topic-by-topic study
          guides. It made memorizing formulas and vocab way easier."
        </Text>
      </View>

      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navBtn}>
          <ArrowLeft size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn}>
          <ArrowRight size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TestimonialSection;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
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
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
    color: '#111827',
  },
  highlighted: {
    backgroundColor: '#f97316',
    color: '#fff',
    borderRadius: 4,
    paddingHorizontal: 4,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 10,
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
    color: '#111827',
  },
  school: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  star: {
    fontSize: 18,
    color: '#facc15',
    marginRight: 2,
  },
  rating: {
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '600',
  },
  quote: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#374151',
  },
  navigation: {
    flexDirection: 'row',
    gap: 16,
  },
  navBtn: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 100,
    elevation: 2,
    shadowColor: '#000',
  },
});
