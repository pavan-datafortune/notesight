import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Menu } from 'lucide-react-native';
import Features from '../components/home-screen/Features';
import ForEveryLearner from '../components/home-screen/ForEveryLearner';
import TestimonialSection from '../components/home-screen/Testimonials';
import FAQSection from '../components/home-screen/FAQs';
import Footer from '../components/home-screen/FooterSection';
import AIExamBoostUI from '../components/home-screen/AIExamBoostUI';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        <Image
          source={require('./../assets/logo.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Menu size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            borderWidth: 1,
            borderColor: 'red',
          }}
        >
          <AIExamBoostUI />
          <Features />
          <ForEveryLearner />
          <TestimonialSection />
          <FAQSection />
          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  navBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
    zIndex: 999,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#111827',
  },
  signInButton: {
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  signInText: {
    color: '#fff',
    fontWeight: '600',
  },
  contentContainer: {
    padding: 16,
    alignItems: 'center',
    width: '100%',
  },
});

export default HomeScreen;
