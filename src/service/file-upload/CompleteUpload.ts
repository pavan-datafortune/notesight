import { useAuthStore } from '../../stores/auth';

type CompleteUploadInput = {
  s3Key: string;
  fileType: string;
  fileTitle: string;
};

export const completeUpload = async (
  input: CompleteUploadInput,
): Promise<any> => {
  const { token } = useAuthStore.getState();

  const query = `mutation CompleteUpload($generateAction: String!, $input: CompleteUploadInput!) {
      document {
        completeUpload(generateAction: $generateAction, input: $input) {
          ...DocumentFragment
          summarize
          summaryStatus
        }
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
    }
  `;

  console.log('input>>>', input);

  const body = {
    operationName: 'CompleteUpload',
    query,
    variables: {
      generateAction: 'DefaultUpload',
      input,
    },
  };

  const response = await fetch('https://api-dev.notesight.co/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    const text = await response.text();
    throw new Error('Unexpected non-JSON response:\n' + text);
  }

  const json = await response.json();
  console.log('CompleteUpload>>>', json); // ✅ Now logs actual GraphQL response

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}: ${JSON.stringify(json)}`);
  }

  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data?.document?.completeUpload;
};
