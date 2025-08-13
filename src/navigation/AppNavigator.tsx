import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashCardScreen from '../screens/FlashCardScreen';
import TutorCenterTools from '../screens/TutorCenterTools';
import Planner from '../screens/Planner';
import { RouteStackParamList } from '../route/Route';

const Stack = createNativeStackNavigator<RouteStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TestPrep"
        component={Planner}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TutorCenterTools"
        component={TutorCenterTools}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FlashCards"
        component={FlashCardScreen}
        options={{ headerBackButtonDisplayMode: 'minimal' }}
      />
    </Stack.Navigator>
  );
}
