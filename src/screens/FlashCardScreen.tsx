import React from 'react';
import FlashCard from '../components/flash-card/FlashCard';
import { ScrollView } from 'react-native';
import { getAllDocumentFlashCards } from '../service/FlashCardService';

const FlashCardScreen = () => {
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
      {getAllDocumentFlashCards.map((each, index) => (
        <FlashCard key={index} flashData={each} />
      ))}
    </ScrollView>
  );
};

export default FlashCardScreen;
