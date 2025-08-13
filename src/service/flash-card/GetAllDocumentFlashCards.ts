import { useAuthStore } from '../../stores/auth';

export async function getAllDocumentFlashCards(documentId: any) {
  const { token } = useAuthStore.getState();
  const query = `
    query GetAllDocumentFlashCards($input: GetAllDocumentFlashCardsInput!) {
      flashCard {
        getAllDocumentFlashCards(input: $input) {
          ...FlashCard
          __typename
        }
        __typename
      }
    }

    fragment FlashCard on FlashCard {
      id
      type
      topic
      question
      answerStatus
      correctAnswer
      transliterationId
      isFavorite
      answer
      restricted
      __typename
    }
  `;

  console.log('documentId api', documentId);

  try {
    const response = await fetch('https://api-dev.notesight.co/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        operationName: 'GetAllDocumentFlashCards',
        variables: { input: { documentId } },
        query,
      }),
    });

    console.log('response flash card', response);

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const text = await response.text();
      throw new Error('Unexpected non-JSON response:\n' + text);
    }

    // Log raw response text to see what the server actually returned
    const json = await response.json();
    console.log('Raw response:', json);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${JSON.stringify(json)}`);
    }

    if (json.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
    }

    // Try parsing only if it looks like JSON
    // return JSON.parse(json);
    return json.data?.flashCard.getAllDocumentFlashCards;
  } catch (error) {
    console.error('Error fetching document flashcards:', error);
    throw error;
  }
}
