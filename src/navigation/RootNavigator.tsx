import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { useAuth0 } from 'react-native-auth0';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, isLoading, error } = useAuth0();
  console.log('ROOT NAV USER CONTEXT :: ', user, error, isLoading);

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
