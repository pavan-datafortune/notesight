import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { AppNavBar } from '../components/app-navbar/AppNavbar';
import TestPreparationModal from '../components/planner/TestPreparationModal';

const Planner = () => {
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  async function getAllFiles() {
    try {
      setLoading(true);

      setLoading(false);
    } catch (error) {
      console.log('error>>>', error);
    }
  }
  useEffect(() => {
    getAllFiles();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppNavBar />

      <View style={styles.container}>
        <Text style={styles.title}>Let's Plan Your Study Day, Pavanwm007</Text>

        <View style={styles.card}>
          {/* Illustration placeholder */}
          <Image
            source={require('../assets/placeholders/planner-placeholder.png')}
            style={styles.image}
            resizeMode="contain"
          />

          <Text style={styles.subtitle}>
            You don’t have any upcoming sessions. Let’s plan one now.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setShowModal(true);
            }}
          >
            <Text style={styles.buttonText}>+ Add New</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TestPreparationModal
        visible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e1e1e',
  },
  card: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4d9fff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Planner;
