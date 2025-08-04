import { View, Button, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();

  return (
    <View>
      <Text>Login Page</Text>
      <Button title="Login with Auth0" onPress={login} />
    </View>
  );
}
