import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Features from '../components/home-screen/Features';
import ForEveryLearner from '../components/home-screen/ForEveryLearner';
import TestimonialSection from '../components/home-screen/Testimonials';
import FAQSection from '../components/home-screen/FAQs';
import Footer from '../components/home-screen/FooterSection';
import AIExamBoostUI from '../components/home-screen/AIExamBoostUI';
import LoginScreen from './LoginScreen';
import { Menu } from 'lucide-react-native';
import SideMenu from '../components/home-screen/SideMenu';

const HomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <LoginScreen />

        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Menu size={32} color="black" />
        </TouchableOpacity>

        <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
      </View>

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
