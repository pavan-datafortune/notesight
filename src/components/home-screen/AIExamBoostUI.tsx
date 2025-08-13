import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import { RouteStackParamList } from '../../route/Route';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const AIExamBoostUI = () => {
  type NavigationProp = NativeStackNavigationProp<RouteStackParamList>;

  const navigation = useNavigation<NavigationProp>();

  return (
    <View>
      {/* Top Card */}
      <View style={styles.card}>
        <Text style={styles.headerText}>
          Want to boost your <Text style={styles.highlight}>standardized</Text>{' '}
          exam score with AI?
        </Text>
        <Text style={styles.subText}>
          Personalized, Efficient, Affordable Learning.{'\n'}Get 24/7 help when
          you need it.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate({
              name: 'FlashCards',
              params: { documentIds: '' },
            })
          }
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      {/* Feature Tags */}
      <View
        style={{
          width: '100%',
          height: 250,
          borderRadius: 20,
          overflow: 'hidden',
        }}
      >
        <Video
          source={require('../../assets/landing.mp4')}
          style={{
            width: '100%',
            height: '100%',
          }}
          repeat={true}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F7F9FC',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    elevation: 3,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B1C1E',
    marginBottom: 10,
  },
  highlight: {
    backgroundColor: '#FFF176',
    fontWeight: '700',
  },
  subText: {
    fontSize: 14,
    color: '#6E6E6E',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AIExamBoostUI;
