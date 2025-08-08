// import { GraphQLClient, gql } from 'graphql-request';
// import { token } from '../../service/AuthService';

// type DocumentType = {
//   id: number;
//   type: string;
//   ownerId: number;
//   filePath: string;
//   fileName: string;
//   createdAt: string;
//   ext: string;
//   summaryStatus: string;
//   __typename: string;
//   summarize?: string;
// };

// type CompleteUploadResponse = {
//   document: {
//     completeUpload: DocumentType;
//   };
// };

// // 1️⃣ Create reusable GraphQL client
// const client = new GraphQLClient('https://api-dev.notesight.co/graphql', {
//   headers: {
//     Authorization: `Bearer ${token}`, // change to your auth logic
//   },
// });

// // 2️⃣ GraphQL operations

// // CompleteUpload Mutation
// const COMPLETE_UPLOAD = gql`
//   mutation CompleteUpload(
//     $generateAction: String!
//     $input: CompleteUploadInput!
//   ) {
//     document {
//       completeUpload(generateAction: $generateAction, input: $input) {
//         ...DocumentFragment
//         summarize
//         summaryStatus
//         __typename
//       }git st
//       __typename
//     }
//   }

//   fragment DocumentFragment on Document {
//     id
//     type
//     ownerId
//     filePath
//     fileName
//     createdAt
//     ext
//     summaryStatus
//     __typename
//   }
// `;

// // 3️⃣ Service functions

// export async function completeUpload(input: {
//   fileTitle?: string;
//   s3Key: string;
//   fileType: 'image' | 'video' | 'document' | string;
// }) {
//   const variables = {
//     generateAction: 'DefaultUpload',
//     input: {
//       fileTitle: input.fileTitle ?? '',
//       s3Key: input.s3Key,
//       fileType: input.fileType,
//     },
//   };
//   console.log('variables>>>', variables);

//   const data = await client.request<CompleteUploadResponse>(
//     COMPLETE_UPLOAD,
//     variables,
//   );
//   console.log('data>>>', data);
//   return data.document.completeUpload;
// }

// export async function documentGetAll() {
//   const data = await client.request(DOCUMENT_GET_ALL);
//   return data.document.getAll;
// }

import { token } from '../../service/AuthService';

type CompleteUploadInput = {
  fileTitle: string;
  fileType: string;
  s3Key: string;
};

export const completeUpload = async (
  input: CompleteUploadInput,
): Promise<any> => {
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

  console.log('CompleteUpload>>>', response);

  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    const text = await response.text();
    throw new Error('Unexpected non-JSON response:\n' + text);
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GraphQL request failed: ${errorText}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }

  return json.data?.document?.completeUpload;
};
