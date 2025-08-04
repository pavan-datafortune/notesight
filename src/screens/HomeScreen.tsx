import { View, Button, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View>
      <Text>Welcome {user?.name}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
