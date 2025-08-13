import { token } from '../../auth-key/AuthService';
// import { useAuthStore } from '../../stores/auth';

export const fetchAllDocuments = async () => {
  // const { token } = useAuthStore.getState();

  console.log('Fetching all documents with token:', token);

  const query = `
    query documentGetAll {
      document {
        getAll {
          ...DocumentFragment
          mePermission {
            ...PermissionFragment
            __typename
          }
          tag {
            ...TagFragment
            __typename
          }
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

    fragment PermissionFragment on Permission {
      id
      type
      ownerId
      shareTo
      createdAt
      __typename
    }

    fragment TagFragment on Tag {
      id
      createdAt
      text
      color
      ownerId
      __typename
    }
  `;

  const payload = {
    operationName: 'documentGetAll',
    query,
    variables: {},
  };

  try {
    const response = await fetch('https://api-dev.notesight.co/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // 🔐 Attach your token
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    return result.data.document.getAll;
  } catch (error) {
    console.error('❌ Failed to fetch documents:', error);
    return [];
  }
};
