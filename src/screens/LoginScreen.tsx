import { View, Button, Text } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { Platform } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { auth0Config } from '../auth/auth0';

export default function LoginScreen() {
  const { authorize, clearSession, cancelWebAuth } = useAuth0();

  const redirectUri = Platform.select({
    ios: `notesight://${auth0Config.domain}/ios/${auth0Config.appBundleId}/callback`,
    android: `notesight://${auth0Config.domain}/android/${auth0Config.appBundleId}/callback`,
  });

  const login = async () => {
    try {
      const credentials = await authorize({
        scope: 'openid profile email',
        redirectUrl: redirectUri,
      });

      await Keychain.setGenericPassword('token', credentials.accessToken);
    } catch (e: any) {
      if (e.code === 'USER_CANCELLED') {
        await cancelWebAuth();
        console.log('User closed login screen — no action taken', e);
      } else {
        console.log('Login failed:', e);
        // Show error UI
      }
    }
  };

  return (
    <View>
      <Button title="Login with Auth0" onPress={login} />
    </View>
  );
}
