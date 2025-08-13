import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { constructRedirectUrl } from '../auth/auth0';
import { useState } from 'react';
import { AppNavBar } from '../components/app-navbar/AppNavbar';
import { useFocusEffect } from '@react-navigation/native';
import { useAuthStore } from '../stores/auth';
import HomeScreen from './HomeScreen';
import * as Keychain from 'react-native-keychain';

export default function LoginScreen() {
  const { cancelWebAuth, authorize } = useAuth0();
  const { setToken, login } = useAuthStore.getState();

  const [isLoading, setIsLoading] = useState(false);

  const userLogin = async () => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log('constructRedirectUrl', constructRedirectUrl());
      const credentials = await authorize(
        {
          scope: 'openid profile email',
          redirectUrl: constructRedirectUrl(),
          additionalParameters: { prompt: 'login' },
          // audience: 'https://notesight.co/auth-callback',
        },
        {
          customScheme: 'notesight',
          ephemeralSession: true,
        },
      );
      console.log('Login successful', credentials);
      login();
      setToken(credentials.accessToken);
      await Keychain.setGenericPassword('token', credentials.accessToken);
      setIsLoading(false);
    } catch (e: any) {
      if (e.code === 'USER_CANCELLED') {
        await cancelWebAuth();
        console.log('User closed login screen — no action taken', e);
      } else {
        console.log('Login failed:', e);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      userLogin();
    }, []),
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <AppNavBar login={userLogin} />

        <HomeScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: { height: 30, width: 200 },
});
