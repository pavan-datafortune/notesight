import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import FlashCardScreen from '../screens/FlashCardScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="notesight" component={LoginScreen} /> */}
      <Stack.Screen
        name="notesight"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="Flash Cards" component={FlashCardScreen} /> */}
    </Stack.Navigator>
  );
}
