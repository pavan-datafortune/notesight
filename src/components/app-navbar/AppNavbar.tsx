import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import SideMenu from '../home-screen/SideMenu';
import { Menu } from 'lucide-react-native';
import LoginScreen from '../../screens/LoginScreen';
import React, { useState } from 'react';

export const AppNavBar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.navBar}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <LoginScreen />

      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Menu size={32} color="black" />
      </TouchableOpacity>
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </View>
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
