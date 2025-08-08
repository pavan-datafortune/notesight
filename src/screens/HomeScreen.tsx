import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Features from '../components/home-screen/Features';
import ForEveryLearner from '../components/home-screen/ForEveryLearner';
import TestimonialSection from '../components/home-screen/Testimonials';
import FAQSection from '../components/home-screen/FAQs';
import Footer from '../components/home-screen/FooterSection';
import AIExamBoostUI from '../components/home-screen/AIExamBoostUI';
// import FloatingButton from '../components/home-screen/FloatingButton';
// import UploadModal from '../components/home-screen/UploadModal';
import { AppNavBar } from '../components/app-navbar/AppNavbar';

const HomeScreen = () => {
  // const [isModalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppNavBar />
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

      {/* <FloatingButton onPress={() => setModalVisible(true)} />
      <UploadModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      /> */}
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
  contentContainer: {
    padding: 16,
    alignItems: 'center',
    width: '100%',
  },
});

export default HomeScreen;
