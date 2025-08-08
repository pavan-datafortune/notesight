import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { Menu } from 'lucide-react-native';
import SideMenu from '../components/home-screen/SideMenu';
import { fetchAllDocuments } from '../api/file-upload/GetFiles';
import FileTiles from '../components/dashboard/FileList';
import HorizontalButtons from '../components/dashboard/Features';
import UploadFileBlock from '../components/dashboard/UploadFileBlock';

const Dashboard = () => {
  const [menuVisible, setMenuVisible] = useState(false);
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
      <View style={styles.navBar}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Menu size={32} color="black" />
        </TouchableOpacity>
        <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
      </View>

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
