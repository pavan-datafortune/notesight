import { useAuthStore } from '../../stores/auth';

export const getPresignedUrl = async (fileName: string) => {
  const { token } = useAuthStore.getState();

  const query = `
    mutation GetPresignedUploadUrl($input: GetPresignedUrlInput!) {
      document {
        getPresignedUploadUrl(input: $input) {
          url
          key
        }
      }
    }
  `;

  const variables = {
    input: {
      fileName,
    },
  };

  const payload = {
    operationName: 'GetPresignedUploadUrl',
    query,
    variables,
  };

  console.log('>>> Payload:', JSON.stringify(payload, null, 2));

  const response = await fetch('https://api-dev.notesight.co/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  console.log('>>> Full Response:', result);

  const presigned = result?.data?.document?.getPresignedUploadUrl;

  console.log('Presigned URL:', presigned);
  return presigned;
};
