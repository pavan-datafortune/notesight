import { useAuthStore } from '../../stores/auth';

export async function generateFlashCardOnDemand(documentIds: number[]) {
  const { token } = useAuthStore.getState();
  const query = `
    mutation generateFlashCardOnDemand($input: GenerateSummariesInput!) {
        document {
            generateFlashCardOnDemand(input: $input) {
                ...DocumentFragment
                __typename
                }
                __typename
                }
                }
                
                fragment DocumentFragment on Document {
                    id
                    type
                    ownerId
                    filePath
                    fileName
                    createdAt
                    ext
                    summaryStatus
                    __typename
                    }
                    `;

  try {
    console.log('generateFlashCardOnDemand HIT');
    const response = await fetch('https://api-dev.notesight.co/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        operationName: 'generateFlashCardOnDemand',
        variables: {
          input: {
            documentIds,
          },
        },
        query,
      }),
    });

    console.log('response flash card<<', response);

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const text = await response.text();
      throw new Error('Unexpected non-JSON response:\n' + text);
    }

    console.log('contentType', contentType);
    const json = await response.json();
    console.log('json', json);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${JSON.stringify(json)}`);
    }
    if (json.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
    }

    return json.data?.document.generateFlashCardOnDemand;
  } catch (error) {
    console.error('Error generating flashcards on demand:', error);
    throw error;
  }
}
