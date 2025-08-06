import React from 'react';
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Linkedin } from 'lucide-react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logo-white.png')}
          style={styles.logo}
        />
      </View>

      {/* Navigation Links */}
      <View style={styles.navLinks}>
        <Text style={styles.navText}>Homepage</Text>
        <Text style={styles.navText}>Pricing</Text>
        <Text style={styles.navText}>FAQ</Text>
      </View>

      {/* LinkedIn Icon */}
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://www.linkedin.com')}
          style={styles.iconButton}
        >
          <Linkedin size={15} color="#0B0E1C" />
        </TouchableOpacity>
      </View>

      {/* Legal Links */}
      <View style={styles.legalLinks}>
        <Text style={styles.legalText}>Privacy Policy</Text>
        <Text style={styles.legalText}>Terms and Conditions</Text>
      </View>

      {/* Copyright */}
      <View style={styles.copyContainer}>
        <Text style={styles.copyText}>© 2020–2025 Notesight</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0B0E1C',
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderRadius: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 150,
    height: 40,
    resizeMode: 'contain',
  },
  navLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 24,
  },
  navText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconButton: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 8,
  },
  legalLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 16,
  },
  legalText: {
    color: '#A0AEC0',
    fontSize: 12,
  },
  copyContainer: {
    alignItems: 'center',
  },
  copyText: {
    color: '#A0AEC0',
    fontSize: 12,
  },
});

export default Footer;
