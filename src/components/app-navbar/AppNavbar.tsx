import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Menu } from 'lucide-react-native';
import React, { useState } from 'react';
import { useAuth0 } from 'react-native-auth0';
import SideMenu from '../common/SideMenu';

export const AppNavBar = ({ login }: any) => {
  const { user } = useAuth0();

  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.navBar}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
      {!user && (
        <TouchableOpacity style={styles.signInButton} onPress={login}>
          <Text style={styles.signInText}>Login</Text>
        </TouchableOpacity>
      )}

      {/* <LoginScreen /> */}

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
  signInButton: {
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  signInText: {
    color: '#fff',
    fontWeight: '600',
  },
  navBar: {
    width: '100%',
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
