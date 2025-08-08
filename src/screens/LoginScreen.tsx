import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { constructRedirectUrl } from '../auth/auth0';
import * as Keychain from 'react-native-keychain';
import { useEffect, useState } from 'react';

export default function LoginScreen() {
  const { user, cancelWebAuth, authorize, getCredentials, clearSession } =
    useAuth0();
  const [credentials, setCredentials] = useState<any>();

  const updateCredentials = async () => {
    try {
      const data = await getCredentials();
      if (data) {
        setCredentials({
          accessToken: data.accessToken,
          idToken: data.idToken,
        });
      } else {
        setCredentials(null);
      }
    } catch (error) {
      console.log(error);
      setCredentials(null);
    }
  };

  useEffect(() => {
    setTimeout(updateCredentials, 1000);
  }, []);

  const login = async () => {
    try {
      const credentials = await authorize(
        {
          scope: 'openid profile email',
          redirectUrl: constructRedirectUrl(),
        },
        { customScheme: 'com.notesight.app.auth0' },
      );
      console.log('AFTER LOGIN -> ', credentials);
      await Keychain.setGenericPassword('token', credentials.accessToken);
      setCredentials(null);
      updateCredentials();
    } catch (e: any) {
      if (e.code === 'USER_CANCELLED') {
        await cancelWebAuth();
        console.log('User closed login screen — no action taken', e);
      } else {
        console.log('Login failed:', e);
      }
    }
  };

  const logout = async () => {
    try {
      await clearSession({ federated: true });
    } catch (e) {
      console.log('Error clearing session:', e);
    }
    await Keychain.resetGenericPassword();
    setCredentials(null);
  };

  console.log('STATE CREDS', user, credentials);

  if (user || credentials) {
    return (
      <TouchableOpacity style={styles.signInButton} onPress={logout}>
        <Text style={styles.signInText}>Sign out</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={styles.signInButton} onPress={login}>
        <Text style={styles.signInText}>Sign in</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
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
});
