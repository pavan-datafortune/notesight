import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { Platform } from 'react-native';
import { auth0Config } from '../auth/auth0';
import * as Keychain from 'react-native-keychain';

export default function LoginScreen() {
  const { authorize, clearSession, cancelWebAuth } = useAuth0();

  const redirectUri = Platform.select({
    ios: `${auth0Config.appBundleId}.auth0://${auth0Config.domain}/ios/${auth0Config.appBundleId}/callback`,
    android: `${auth0Config.appBundleId}.auth0://${auth0Config.domain}/android/${auth0Config.appBundleId}/callback`,
  });

  const login = async () => {
    console.log(redirectUri);
    try {
      const credentials = await authorize(
        {
          scope: 'openid profile email',
          redirectUrl: redirectUri,
        },
        {
          useLegacyCallbackUrl: true,
        },
      );

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
