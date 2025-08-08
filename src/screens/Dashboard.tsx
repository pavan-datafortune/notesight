import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { fetchAllDocuments } from '../api/file-upload/GetFiles';
import FileTiles from '../components/dashboard/FileList';
import HorizontalButtons from '../components/dashboard/Features';
import UploadFileBlock from '../components/dashboard/UploadFileBlock';
import { AppNavBar } from '../components/app-navbar/AppNavbar';

const Dashboard = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [files, setFiles] = useState([]);

  console.log('isModalVisible>>>', isModalVisible);

  async function getAllFiles() {
    try {
      const getFilesResp = await fetchAllDocuments();

      setFiles(getFilesResp);
      console.log('getFilesResp>>>', getFilesResp);
    } catch (error) {
      console.log('error>>>', error);
    }
  }
  useEffect(() => {
    getAllFiles();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppNavBar />

      <HorizontalButtons />
      <ScrollView>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 20,
            gap: 24,
          }}
        >
          <UploadFileBlock />

          <FileTiles files={files} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  navBar: {
    marginTop: 45,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
    zIndex: 999,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#111827',
  },
  contentContainer: {
    padding: 16,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: 150,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Dashboard;
