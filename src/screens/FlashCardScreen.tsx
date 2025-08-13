import React, { useEffect, useState } from 'react';
import FlashCard from '../components/flash-card/FlashCard';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { RouteStackParamList } from '../route/Route';
import { RouteProp, useRoute } from '@react-navigation/native';
import { generateFlashCardOnDemand } from '../service/flash-card/GenerateFlashCardOnDemand';
import { getAllDocumentFlashCards } from '../service/flash-card/GetAllDocumentFlashCards';

type FlashCardsRouteProp = RouteProp<RouteStackParamList, 'FlashCards'>;

const FlashCardScreen = () => {
  const [flashCardData, setFlashCardData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const route = useRoute<FlashCardsRouteProp>();
  const { documentIds } = route.params;
  console.log('Navi documentId>>', documentIds);

  useEffect(() => {
    getFlashCardsDetails(documentIds);
  }, [documentIds]);

  async function getFlashCardsDetails(documentIds: any) {
    try {
      setLoading(true);
      if (documentIds.length === 1) {
        const resp = await getAllDocumentFlashCards(documentIds[0]);
        setFlashCardData(resp);
      } else {
        const resp = await generateFlashCardOnDemand(documentIds);
        setFlashCardData(resp);
      }

      setLoading(false);
    } catch (error) {
      console.log('Flash Cards Error :', error);
    }
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        gap: 16,
      }}
    >
      {flashCardData.length === 0 ? (
        <View style={{ padding: 20 }}>
          <Text>No flash cards available for this document.</Text>
        </View>
      ) : (
        <>
          {flashCardData?.map((each, index) => (
            <View key={index}>
              <FlashCard flashData={each} />
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

export default FlashCardScreen;
