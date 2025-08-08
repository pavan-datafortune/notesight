import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import auth0 from '../auth/auth0';
import * as Keychain from 'react-native-keychain';

export default function LoginScreen() {
  const { cancelWebAuth } = useAuth0();

  const login = async () => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email',
        audience: 'https://dev-7v1ogpzhapj6e1en.us.auth0.com',
        redirectUrl: 'com.notesight://auth-callback',
      });

      await Keychain.setGenericPassword('token', credentials.accessToken);
    } catch (e: any) {
      if (e.code === 'USER_CANCELLED') {
        await cancelWebAuth();
        console.log('User closed login screen — no action taken', e);
      } else {
        console.log('Login failed:', e);
      }
    }
  };

  return (
    <TouchableOpacity style={styles.signInButton} onPress={login}>
      <Text style={styles.signInText}>Sign in</Text>
    </TouchableOpacity>
  );
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
