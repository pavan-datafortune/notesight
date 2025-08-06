import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteStackParamList } from '../route/Route';
import LoginScreen from '../screens/LoginScreen';
import FlashCardScreen from '../screens/FlashCardScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator<RouteStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home Screen">
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen
        name="Home Screen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Flash Cards"
        component={FlashCardScreen}
        options={{ headerBackButtonDisplayMode: 'minimal' }}
      />
    </Stack.Navigator>
  );
}
