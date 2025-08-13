import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Features from '../components/home-screen/Features';
import ForEveryLearner from '../components/home-screen/ForEveryLearner';
import TestimonialSection from '../components/home-screen/Testimonials';
import FAQSection from '../components/home-screen/FAQs';
import Footer from '../components/home-screen/FooterSection';
import AIExamBoostUI from '../components/home-screen/AIExamBoostUI';
import { AppNavBar } from '../components/app-navbar/AppNavbar';

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 20,
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
  contentContainer: {
    padding: 16,
    alignItems: 'center',
    width: '100%',
  },
});

export default HomeScreen;
