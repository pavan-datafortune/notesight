import Lucide from '@react-native-vector-icons/lucide';
import React, { useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

const FlashCard = ({ key, flashData }: any) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = () => {
    if (isFlipped) {
      Animated.spring(animatedValue, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 10,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        useNativeDriver: true,
        friction: 8,
        tension: 10,
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <TouchableWithoutFeedback key={key} onPress={flipCard}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ perspective: 1000 }, { rotateY: frontInterpolate }],
            },
          ]}
        >
          <View
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
            }}
          >
            <View></View>
            <Text style={styles.fontCardText}>{flashData.question}</Text>

            <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
              <Lucide name="lock" color="#444444" size={12} />
              <Text style={{ fontSize: 14, color: '#8C8C8C' }}>
                Click to flip card
              </Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            {
              transform: [{ perspective: 1000 }, { rotateY: backInterpolate }],
            },
          ]}
        >
          <View>
            <Text style={styles.backCardText}>{flashData.correctAnswer}</Text>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    width: '90%',
    height: 150,
    backgroundColor: '#ECF4FA',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    borderRadius: 10,
  },
  cardBack: {
    backgroundColor: '#EAEAEA',
  },
  backCardText: {
    padding: 16,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  fontCardText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FlashCard;
