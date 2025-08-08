import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteStackParamList } from '../route/Route';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator<RouteStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home Screen">
      <Stack.Screen
        name="Home Screen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
