import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { fetchAllDocuments } from '../service/file-upload/GetFiles';
import { AppNavBar } from '../components/app-navbar/AppNavbar';
import FileTiles from '../components/planner/FileList';
import UploadFileBlock from '../components/planner/UploadFileBlock';
import ServicesList from '../components/planner/ServicesList';

const TutorCenterTools = () => {
  const [files, setFiles] = useState<any>([]);
  const [isLoading, setLoading] = useState(false);
  const [isUploading, setUploading] = useState<any>(false);

  async function getAllFiles() {
    try {
      setLoading(true);
      const getFilesResp = await fetchAllDocuments();
      const sortedData = [...getFilesResp].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      setFiles(sortedData);
      console.log('getFilesResp>>>', sortedData);
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

      <ServicesList onUpdate={getAllFiles} files={files} />

      <ScrollView>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 20,
            gap: 24,
          }}
        >
          <UploadFileBlock onUpdate={getAllFiles} setUploading={setUploading} />

          {isUploading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <FileTiles files={files} />
          )}
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

export default TutorCenterTools;
