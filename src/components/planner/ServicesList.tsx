import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { RouteStackParamList } from '../../route/Route';
import {
  CreditCard,
  FilePenLine,
  FileType2,
  Languages,
  LetterText,
} from 'lucide-react-native';
import UploadFilesForServiceModal from '../common/UploadFilesForServiceModal';

type CardItem = {
  id: string;
  title: string;
  icon: any;
  screen: keyof RouteStackParamList;
};

export default function ServicesList({ onUpdate, files }: any) {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState({});

  const data: CardItem[] = [
    {
      id: '1',
      title: 'Study Guide',
      icon: <FileType2 color={'#FFFFFF'} />,
      screen: 'FlashCards',
    },
    {
      id: '2',
      title: 'Flash Cards',
      icon: <CreditCard color={'#FFFFFF'} />,
      screen: 'FlashCards',
    },
    {
      id: '3',
      title: 'Transcripts',
      icon: <LetterText color={'#FFFFFF'} />,
      screen: 'FlashCards',
    },
    {
      id: '4',
      title: 'Practice Tests',
      icon: <FilePenLine color={'#FFFFFF'} />,
      screen: 'FlashCards',
    },
    {
      id: '5',
      title: 'Translation',
      icon: <Languages color={'#FFFFFF'} />,
      screen: 'FlashCards',
    },
  ];

  return (
    <View
      style={{
        paddingVertical: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ScrollView
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardWrapper}
            onPress={() => {
              setShowModal(true);
              setSelectedService(item);
              // navigation.navigate(item.screen);
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                gap: 10,
              }}
            >
              {item.icon}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.plus}>+ </Text>
                <Text style={styles.text}>{item.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <UploadFilesForServiceModal
        selectedService={selectedService}
        files={files}
        visible={showModal}
        onClose={() => setShowModal(false)}
        onUpdate={onUpdate}
      />
      {/* <UploadModal visible={showModal} onClose={() => setShowModal(false)} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
  },
  row: {
    paddingHorizontal: 10,
  },
  cardWrapper: {
    backgroundColor: '#3BA3F3',
    marginRight: 10,
    borderRadius: 10,
  },
  card: {
    color: '#FFFFFF',
    width: 150,
    height: 100,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 5,
  },
  plus: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
