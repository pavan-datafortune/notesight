// import { useCallback, useState } from 'react';
// import { RefetchQueryDescriptor, useApolloClient } from '@apollo/client';
// import { ASTNode, print } from 'graphql';
// import { mediaExtensions } from '../utils/constants/MediaConstants';
// import { documentExtensions } from '../utils/constants/DocumentExtentions';
// // import { GET_ME } from '../../apollo/user';
// import {
//   GET_PRESIGNED_UPLOAD_URL,
//   COMPLETE_UPLOAD,
//   DOCUMENT_GET_ALL,
//   GENERATE_PRESIGNED_GROUP_UPLOAD,
//   COMPLETE_GROUP_UPLOAD,
//   GET_PRESIGNED_MEDIA_UPLOAD_URL,
//   COMPLETE_MEDIA_UPLOAD,
// } from '../../apollo/document';
// import { token } from '../service/AuthService';

// export type IUploadStatus = 'uploading' | 'process' | 'error' | null;
// export type UploadMetadata = {
//   key: string;
//   fileName: string;
//   isVideo?: boolean;
//   duration?: number; // Duration in seconds (rounded to integer)
//   fileType: string; // 'media' | 'document'
// };

// const getFileType = (fileName: string): 'media' | 'document' => {
//   const extension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
//   if (mediaExtensions.includes(extension)) return 'media';
//   if (documentExtensions.includes(extension)) return 'document';
//   throw new Error(`Unsupported file type: ${extension}`);
// };

// // Helper functions
// const getFileTypeEnum = (
//   fileName: string,
// ): 'audio' | 'video' | 'application' | 'image' | 'text' => {
//   const extension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();

//   // Audio files
//   if (['.mp3', '.wav', '.m4a', '.aac', '.ogg', '.flac'].includes(extension)) {
//     return 'audio';
//   }

//   // Video files
//   if (['.mp4', '.mov', '.avi', '.mkv', '.webm', '.flv'].includes(extension)) {
//     return 'video';
//   }

//   // Image files
//   if (
//     ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp', '.svg'].includes(
//       extension,
//     )
//   ) {
//     return 'image';
//   }

//   // Text files
//   if (['.txt', '.md', '.csv'].includes(extension)) {
//     return 'text';
//   }

//   // Default to application for documents and other files
//   return 'application';
// };

// const isVideoFile = (fileName: string): boolean => {
//   const extension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
//   return [
//     '.mp4',
//     '.mov',
//     '.avi',
//     '.mkv',
//     '.webm',
//     '.flv',
//     '.wmv',
//     '.m4v',
//     '.3gp',
//   ].includes(extension);
// };

// // const getMediaDuration = (file: File): Promise<number> => {
// //   return new Promise((resolve, reject) => {
// //     const isVideo = isVideoFile(file.name);
// //     const element = isVideo
// //       ? document.createElement('video')
// //       : document.createElement('audio');

// //     const url = URL.createObjectURL(file);

// //     const cleanup = () => {
// //       URL.revokeObjectURL(url);
// //       element.removeEventListener('loadedmetadata', onLoadedMetadata);
// //       element.removeEventListener('error', onError);
// //     };

// //     const onLoadedMetadata = () => {
// //       const duration = element.duration;
// //       cleanup();
// //       resolve(duration);
// //     };

// //     const onError = () => {
// //       cleanup();
// //       // Default to 0 if we can't determine duration
// //       resolve(0);
// //     };

// //     element.addEventListener('loadedmetadata', onLoadedMetadata);
// //     element.addEventListener('error', onError);

// //     element.src = url;

// //     // Timeout after 5 seconds
// //     setTimeout(() => {
// //       cleanup();
// //       resolve(0);
// //     }, 5000);
// //   });
// // };

// // Handler functions
// /**
//  * Handles presigned URL generation for a single file upload
//  */
// async function handleSingleFileUpload(
//   file: File,
//   client: any,
// ): Promise<{
//   data: {
//     uploadUrls: { url: string; key: string; fileName: string; type: string }[];
//   };
// }> {
//   const fileType = getFileType(file.name);
//   const mutationQuery =
//     fileType === 'media'
//       ? GET_PRESIGNED_MEDIA_UPLOAD_URL
//       : GET_PRESIGNED_UPLOAD_URL;

//   const mutationInput =
//     fileType === 'media' ? { fileNames: [file.name] } : { fileName: file.name };

//   const response = await client.mutate({
//     mutation: mutationQuery,
//     variables: { input: mutationInput },
//   });

//   if (fileType === 'media') {
//     const uploadUrl =
//       response.data.transliteration.generatePresignedUploadUrls[0];
//     return {
//       data: {
//         uploadUrls: [
//           {
//             url: uploadUrl.url,
//             key: uploadUrl.s3Key,
//             fileName: uploadUrl.fileName,
//             type: fileType,
//           },
//         ],
//       },
//     };
//   }

//   const { url, key } = response.data.document.getPresignedUploadUrl;
//   return {
//     data: {
//       uploadUrls: [
//         {
//           url,
//           key,
//           fileName: file.name,
//           type: fileType,
//         },
//       ],
//     },
//   };
// }

// /**
//  * Handles presigned URL generation for multiple file uploads
//  */
// async function handleMultipleFileUpload(
//   files: File[],
//   client: any,
// ): Promise<{
//   data: {
//     uploadUrls: { url: string; key: string; fileName: string; type: string }[];
//   };
// }> {
//   const documentFiles = files.filter(
//     file => getFileType(file.name) === 'document',
//   );
//   const mediaFiles = files.filter(file => getFileType(file.name) === 'media');

//   const input: any = {};
//   if (documentFiles.length > 0) {
//     input.documentFileNames = documentFiles.map(file => file.name);
//   }
//   if (mediaFiles.length > 0) {
//     input.transliterationFileNames = mediaFiles.map(file => file.name);
//   }

//   const response = await client.mutate({
//     mutation: GENERATE_PRESIGNED_GROUP_UPLOAD,
//     variables: { input },
//   });

//   const documentUrls =
//     response.data.genereatePresginedAllFileGroupUpload.documentUrls || [];
//   const transliterationUrls =
//     response.data.genereatePresginedAllFileGroupUpload.transliterationUrls ||
//     [];

//   const uploadUrls = [
//     ...documentUrls.map((url: any) => ({
//       url: url.url,
//       key: url.s3Key,
//       fileName: url.fileName,
//       type: 'document' as const,
//     })),
//     ...transliterationUrls.map((url: any) => ({
//       url: url.url,
//       key: url.s3Key,
//       fileName: url.fileName,
//       type: 'media' as const,
//     })),
//   ];

//   return { data: { uploadUrls } };
// }

// /**
//  * Handles completion notification for multiple file uploads
//  */
// async function handleGroupUploadCompletion(
//   client: any,
//   action: string,
//   fileTitle: string,
//   files: File[],
//   uploadMetadata: UploadMetadata[],
// ): Promise<any> {
//   const documentFiles = files.filter(
//     file => getFileType(file.name) === 'document',
//   );
//   const mediaFiles = files.filter(file => getFileType(file.name) === 'media');

//   const variables: any = {
//     input: {},
//     fileTitle,
//     generateAction: action,
//   };

//   if (documentFiles.length > 0) {
//     // Find corresponding metadata for document files by matching file names
//     const documentMeta = uploadMetadata.filter(meta => {
//       return documentFiles.some(file => file.name === meta.fileName);
//     });

//     variables.input.documentFiles = documentMeta.map(meta => ({
//       s3Key: meta.key,
//       fileType: getFileTypeEnum(meta.fileName),
//     }));
//   }

//   if (mediaFiles.length > 0) {
//     // Find corresponding metadata for media files by matching file names
//     const mediaMeta = uploadMetadata.filter(meta => {
//       return mediaFiles.some(file => file.name === meta.fileName);
//     });
//     variables.input.transliterationFiles = mediaMeta.map(meta => ({
//       s3Key: meta.key,
//       fileName: meta.fileName,
//       isVideo: meta.isVideo || false,
//       duration: Math.round(meta.duration || 0),
//     }));
//   }

//   try {
//     const response = await client.mutate({
//       mutation: COMPLETE_GROUP_UPLOAD,
//       variables,
//     });

//     // Check if only media file was uploaded
//     const isMediaUpload = mediaFiles.length === 1 && documentFiles.length === 0;

//     // Return structured response for navigation
//     return {
//       ...response,
//       data: {
//         ...response.data,
//         navigationInfo: {
//           id: response.data.finalizeGroupedDocumentUploadAllFile.id,
//           isGroupedUpload: true,
//           isMediaUpload,
//         },
//       },
//     };
//   } catch (error) {
//     console.error(
//       '[notifyUploadCompleted] Error completing group upload:',
//       error,
//     );
//     throw error;
//   }
// }

// /**
//  * Handles completion notification for single file uploads
//  */
// async function handleSingleUploadCompletion(
//   client: any,
//   action: string,
//   fileTitle: string,
//   file: File,
//   singleMeta: UploadMetadata,
// ): Promise<any> {
//   const fileType = getFileType(file.name);

//   if (fileType === 'media') {
//     return await handleMediaUploadCompletion(client, action, singleMeta);
//   }

//   return await handleDocumentUploadCompletion(
//     client,
//     action,
//     fileTitle,
//     singleMeta,
//   );
// }

// /**
//  * Handles completion notification for media file uploads
//  */
// async function handleMediaUploadCompletion(
//   client: any,
//   action: string,
//   singleMeta: UploadMetadata,
// ): Promise<any> {
//   const variables = {
//     generateAction: action,
//     input: [
//       {
//         s3Key: singleMeta.key,
//         fileName: singleMeta.fileName,
//         isVideo: singleMeta.isVideo || false,
//         duration: Math.round(singleMeta.duration || 0),
//       },
//     ],
//   };

//   try {
//     const response = await client.mutate({
//       mutation: COMPLETE_MEDIA_UPLOAD,
//       variables,
//     });

//     // Return structured response for navigation
//     return {
//       ...response,
//       data: {
//         ...response.data,
//         navigationInfo: {
//           id: response.data.transliteration.registerUploadedMedia[0].id,
//           isGroupedUpload: false,
//           isMediaUpload: true,
//         },
//       },
//     };
//   } catch (error) {
//     console.error(
//       '[notifyUploadCompleted] Error completing media upload:',
//       error,
//     );
//     throw error;
//   }
// }

// /**
//  * Handles completion notification for document file uploads
//  */
// async function handleDocumentUploadCompletion(
//   client: any,
//   action: string,
//   fileTitle: string,
//   singleMeta: UploadMetadata,
// ): Promise<any> {
//   const variables = {
//     generateAction: action,
//     input: {
//       fileTitle,
//       s3Key: singleMeta.key,
//       fileType: getFileTypeEnum(singleMeta.fileName),
//     },
//   };

//   try {
//     const response = await client.mutate({
//       mutation: COMPLETE_UPLOAD,
//       variables,
//     });

//     // Return structured response for navigation
//     return {
//       ...response,
//       data: {
//         ...response.data,
//         navigationInfo: {
//           id: response.data.document.completeUpload.id,
//           isGroupedUpload: false,
//           isMediaUpload: false,
//         },
//       },
//     };
//   } catch (error) {
//     console.error(
//       '[notifyUploadCompleted] Error completing document upload:',
//       error,
//     );
//     throw error;
//   }
// }

// /**
//  * Step-1
//  * Retrieves presigned upload URLs from the server for file uploads to S3.
//  *
//  * This function automatically handles both single and multiple file uploads by choosing
//  * the appropriate GraphQL mutation based on the number of files provided. For single files,
//  * it uses GET_PRESIGNED_UPLOAD_URL and transforms the response to match the array format.
//  * For multiple files, it uses GET_PRESIGNED_GROUP_UPLOAD_URLS.
//  *
//  * @param files - Array of File objects to get upload URLs for
//  * @param client - Apollo GraphQL client instance used to execute mutations
//  * @param fileTitle - Optional title/name for the file upload group (defaults to empty string)
//  *
//  * @returns Promise that resolves to an object containing an array of upload URL objects.
//  *          Each upload URL object contains:
//  *          - url: The presigned S3 upload URL
//  *          - key: The S3 object key where the file will be stored
//  *          - fileName: The original name of the file
//  *
//  * @throws Will throw an error if the GraphQL mutation fails or if the server response is invalid
//  */
// async function getUploadUrls(
//   files: File[],
//   client: any,
//   fileTitle: string = '',
// ): Promise<{
//   data: {
//     uploadUrls: { url: string; key: string; fileName: string; type: string }[];
//   };
// }> {
//   if (files.length === 1) {
//     return await handleSingleFileUpload(files[0], client);
//   }

//   return await handleMultipleFileUpload(files, client);
// }

// /**
//  * Step-2
//  * Standalone S3 upload function for multiple files
//  * @param files Array of File objects to upload
//  * @param uploadUrls Array of upload URL objects with {url, key, fileName} structure
//  * @param onProgress Optional callback for upload progress updates (fileIndex, progress)
//  * @param onFileComplete Optional callback when individual file upload completes (fileIndex, success, error)
//  * @returns Promise that resolves with array of upload metadata {key, fileName, isVideo?, duration?} for successful uploads
//  */
// export const uploadFilesToS3 = async (
//   files: File[],
//   uploadUrls: { url: string; key: string; fileName: string }[],
//   onProgress?: (fileIndex: number, progress: number) => void,
//   onFileComplete?: (fileIndex: number, success: boolean, error?: Error) => void,
// ): Promise<UploadMetadata[]> => {
//   if (files.length !== uploadUrls.length) {
//     throw new Error(
//       'Files array and uploadUrls array must have the same length',
//     );
//   }

//   const uploadPromises = files.map(async (file, index) => {
//     // Find the matching upload URL by fileName instead of relying on array index
//     const uploadUrl = uploadUrls.find(url => url.fileName === file.name);
//     if (!uploadUrl) {
//       throw new Error(`No upload URL found for file: ${file.name}`);
//     }
//     const fileType = getFileType(file.name);

//     // Get duration for media files
//     let duration = 0;
//     let isVideo = false;
//     // if (fileType === 'media') {
//     //   isVideo = isVideoFile(file.name);
//     //   try {
//     //     duration = await getMediaDuration(file);
//     //   } catch (error) {
//     //     console.warn(`Could not get duration for ${file.name}:`, error);
//     //     duration = 0;
//     //   }
//     // }

//     // Capture the values in the closure to prevent race conditions
//     const capturedDuration = duration;
//     const capturedIsVideo = isVideo;
//     const capturedFileType = fileType;
//     const capturedUploadUrl = uploadUrl;
//     const capturedFileName = file.name;

//     return new Promise<UploadMetadata>((resolve, reject) => {
//       const xhr = new XMLHttpRequest();

//       xhr.upload.onprogress = event => {
//         if (event.lengthComputable && onProgress) {
//           const percentCompleted = Math.round(
//             (event.loaded * 100) / event.total,
//           );
//           onProgress(index, percentCompleted);
//         }
//       };

//       xhr.onload = () => {
//         if (xhr.status >= 200 && xhr.status < 300) {
//           const metadata: UploadMetadata = {
//             key: capturedUploadUrl.key,
//             fileName: capturedFileName,
//             ...(capturedFileType === 'media' && {
//               isVideo: capturedIsVideo,
//               duration: Math.round(capturedDuration),
//             }),
//             fileType: capturedFileType,
//           };
//           if (onFileComplete) {
//             onFileComplete(index, true);
//           }
//           resolve(metadata);
//         } else {
//           const error = new Error(
//             `S3 upload failed for ${capturedFileName} with status: ${xhr.status}`,
//           );
//           if (onFileComplete) {
//             onFileComplete(index, false, error);
//           }
//           reject(error);
//         }
//       };

//       xhr.onerror = () => {
//         const error = new Error(`S3 upload failed for ${capturedFileName}`);
//         if (onFileComplete) {
//           onFileComplete(index, false, error);
//         }
//         reject(error);
//       };

//       // request config
//       xhr.open('PUT', capturedUploadUrl.url);
//       xhr.setRequestHeader('x-amz-server-side-encryption', 'AES256');
//       xhr.send(file);
//     });
//   });

//   try {
//     const results = await Promise.all(uploadPromises);
//     return results;
//   } catch (error: any) {
//     // Re-throw the error with additional context
//     throw new Error(`One or more file uploads failed: ${error.message}`);
//   }
// };

// /**
//  * Step-3
//  * Notifies the backend that file upload(s) to S3 have been completed.
//  *
//  * This function handles both single and multiple file uploads by calling the appropriate
//  * GraphQL mutation based on the number of files in the upload metadata.
//  *
//  * @param files - Array of original File objects that were uploaded
//  * @param client - The GraphQL client used to execute mutations
//  * @param action - The upload action type, defaults to 'DefaultUpload'
//  * @param fileTitle - The title/name for the uploaded file(s)
//  * @param uploadMetadata - Array of metadata for uploaded files containing S3 keys and file names
//  *
//  * @returns Promise that resolves to the GraphQL mutation response
//  *
//  * @throws Will throw an error if the GraphQL mutation fails
//  */
// async function notifyUploadCompleted(
//   files: File[],
//   client: any,
//   action: string = 'DefaultUpload',
//   fileTitle: string,
//   uploadMetadata: UploadMetadata[],
// ): Promise<any> {
//   if (files.length > 1) {
//     return await handleGroupUploadCompletion(
//       client,
//       action,
//       fileTitle,
//       files,
//       uploadMetadata,
//     );
//   }

//   return await handleSingleUploadCompletion(
//     client,
//     action,
//     fileTitle,
//     files[0],
//     uploadMetadata[0],
//   );
// }

// export function useUploadFile() {
//   const client = useApolloClient();

//   const [progress, setProgress] = useState<number | null>(null);
//   const [status, setStatus] = useState<IUploadStatus>(null);

//   const uploadFile = useCallback(
//     (
//       file: File[],
//       ast: ASTNode,
//       refetchQueryDescriptor: RefetchQueryDescriptor,
//       generateAction: String | null = null,
//       fileTitle: string = '',
//     ) => {
//       return new Promise((resolve, reject) => {
//         setStatus('uploading');

//         const xhr = new XMLHttpRequest();

//         const query = print(ast);

//         const formData = new FormData();

//         // Define the query and variables with a placeholder for the files
//         formData.append(
//           'operations',
//           JSON.stringify({
//             query,
//             variables: {
//               file: new Array(file.length).fill(null),
//               generateAction: generateAction as string,
//               fileTitle,
//             }, // Placeholder for multiple files
//           }),
//         );

//         // Create a map to link each file to the correct variable path
//         // const map = {};
//         const map: { [key: number]: string[] } = {};
//         for (let i = 0; i < file.length; i++) {
//           map[i] = [`variables.file.${i}`];
//         }

//         formData.append('map', JSON.stringify(map));

//         // Append each file to the FormData
//         for (let i = 0; i < file.length; i++) {
//           formData.append(i.toString(), file[i]); // Each file gets an index-based key
//         }

//         xhr.open('POST', process.env.NEXT_PUBLIC_API_URL + '/graphql');

//         xhr.setRequestHeader('apollo-require-preflight', 'true');
//         xhr.setRequestHeader('Accept', 'application/json');
//         xhr.setRequestHeader('Authorization', `Bearer ${token}`);

//         xhr.upload.onprogress = event => {
//           if (event.lengthComputable) {
//             const threshold = 90; // ~10% for processing file
//             const percentCompleted = Math.round(
//               (event.loaded * threshold) / event.total,
//             );
//             setProgress(percentCompleted);
//             if (percentCompleted >= threshold) setStatus('process');
//           }
//         };
//         xhr.onload = () => {
//           let isError = false;
//           if (xhr.status >= 200 && xhr.status < 300) {
//             const data = JSON.parse(xhr.response);
//             if (data?.errors?.length) isError = true;
//             setStatus(isError ? 'error' : null);
//             resolve(data);
//           } else {
//             setStatus('error');
//             setProgress(null);
//             let responseError = JSON.parse(xhr.response);
//             if (responseError?.message?.length) {
//               reject(responseError?.message);
//             } else {
//               reject(xhr);
//             }
//           }

//           client.refetchQueries({
//             include: [
//               refetchQueryDescriptor,
//               // GET_ME
//             ],
//           });
//         };

//         xhr.onerror = () => {
//           setStatus('error');
//           setProgress(null);
//           let responseError = JSON.parse(xhr.response);
//           if (responseError?.message?.length) {
//             reject(responseError?.message);
//           } else {
//             reject(xhr);
//           }
//         };

//         xhr.send(formData);
//       });
//     },
//     [token],
//   );

//   const uploadFileGroup = useCallback(
//     (
//       documentFiles: File[],
//       transliterationFiles: File[],
//       ast: ASTNode,
//       refetchQueryDescriptor: RefetchQueryDescriptor,
//       generateAction: string = 'StudyGuide',
//       fileTitle: string = '',
//     ) => {
//       return new Promise((resolve, reject) => {
//         setStatus('uploading');

//         const xhr = new XMLHttpRequest();
//         const query = print(ast);

//         const formData = new FormData();

//         // Define the query and variables with separate documentFiles and transliterationFiles
//         formData.append(
//           'operations',
//           JSON.stringify({
//             query,
//             variables: {
//               input: {
//                 documentFiles: new Array(documentFiles.length).fill(null),
//                 transliterationFiles: new Array(
//                   transliterationFiles.length,
//                 ).fill(null),
//               },
//               generateAction,
//               fileTitle,
//             },
//           }),
//         );

//         // Create a map to link files to their variable paths
//         const map: { [key: string]: string[] } = {};

//         documentFiles.forEach((_, index) => {
//           map[`doc${index}`] = [`variables.input.documentFiles.${index}`];
//         });
//         transliterationFiles.forEach((_, index) => {
//           map[`trans${index}`] = [
//             `variables.input.transliterationFiles.${index}`,
//           ];
//         });
//         formData.append('map', JSON.stringify(map));

//         // Append document files
//         documentFiles.forEach((file, index) => {
//           formData.append(`doc${index}`, file);
//         });

//         // Append transliteration files
//         transliterationFiles.forEach((file, index) => {
//           formData.append(`trans${index}`, file);
//         });

//         xhr.open('POST', process.env.NEXT_PUBLIC_API_URL + '/graphql');
//         xhr.setRequestHeader('apollo-require-preflight', 'true');
//         xhr.setRequestHeader('Accept', 'application/json');
//         xhr.setRequestHeader('Authorization', `Bearer ${token}`);

//         xhr.upload.onprogress = event => {
//           if (event.lengthComputable) {
//             const threshold = 90; // ~10% for processing
//             const percentCompleted = Math.round(
//               (event.loaded * threshold) / event.total,
//             );
//             setProgress(percentCompleted);
//             if (percentCompleted >= threshold) setStatus('process');
//           }
//         };

//         xhr.onload = () => {
//           let isError = false;
//           if (xhr.status >= 200 && xhr.status < 300) {
//             const data = JSON.parse(xhr.response);
//             if (data?.errors?.length) isError = true;
//             setStatus(isError ? 'error' : null);
//             resolve(data);
//           } else {
//             setStatus('error');
//             setProgress(null);
//             let responseError = JSON.parse(xhr.response);
//             if (responseError?.message?.length) {
//               reject(responseError?.message);
//             } else {
//               reject(xhr);
//             }
//           }

//           client.refetchQueries({
//             include: [
//               refetchQueryDescriptor,
//               // GET_ME
//             ],
//           });
//         };

//         xhr.onerror = () => {
//           setStatus('error');
//           setProgress(null);
//           let responseError = JSON.parse(xhr.response);
//           if (responseError?.message?.length) {
//             reject(responseError?.message);
//           } else {
//             reject(xhr);
//           }
//         };

//         xhr.send(formData);
//       });
//     },
//     [token],
//   );

//   const uploadFileGroupForTest = useCallback(
//     (
//       documentFiles: File[],
//       transliterationFiles: File[],
//       ast: ASTNode,
//       refetchQueryDescriptor: RefetchQueryDescriptor,
//       generateAction: string = 'Tests',
//       fileTitle: string = '',
//     ) => {
//       return new Promise((resolve, reject) => {
//         setStatus('uploading');

//         const xhr = new XMLHttpRequest();
//         const query = print(ast);

//         const formData = new FormData();

//         // Define the query and variables with separate documentFiles and transliterationFiles
//         formData.append(
//           'operations',
//           JSON.stringify({
//             query,
//             variables: {
//               input: {
//                 documentFiles: new Array(documentFiles.length).fill(null),
//                 transliterationFiles: new Array(
//                   transliterationFiles.length,
//                 ).fill(null),
//               },
//               fileTitle,
//             },
//           }),
//         );

//         // Create a map to link files to their variable paths
//         const map: { [key: string]: string[] } = {};

//         documentFiles.forEach((_, index) => {
//           map[`doc${index}`] = [`variables.input.documentFiles.${index}`];
//         });
//         transliterationFiles.forEach((_, index) => {
//           map[`trans${index}`] = [
//             `variables.input.transliterationFiles.${index}`,
//           ];
//         });
//         formData.append('map', JSON.stringify(map));

//         // Append document files
//         documentFiles.forEach((file, index) => {
//           formData.append(`doc${index}`, file);
//         });

//         // Append transliteration files
//         transliterationFiles.forEach((file, index) => {
//           formData.append(`trans${index}`, file);
//         });

//         xhr.open('POST', process.env.NEXT_PUBLIC_API_URL + '/graphql');
//         xhr.setRequestHeader('apollo-require-preflight', 'true');
//         xhr.setRequestHeader('Accept', 'application/json');
//         xhr.setRequestHeader('Authorization', `Bearer ${token}`);

//         xhr.upload.onprogress = event => {
//           if (event.lengthComputable) {
//             const threshold = 90; // ~10% for processing
//             const percentCompleted = Math.round(
//               (event.loaded * threshold) / event.total,
//             );
//             setProgress(percentCompleted);
//             if (percentCompleted >= threshold) setStatus('process');
//           }
//         };

//         xhr.onload = () => {
//           let isError = false;
//           if (xhr.status >= 200 && xhr.status < 300) {
//             const data = JSON.parse(xhr.response);
//             if (data?.errors?.length) isError = true;
//             setStatus(isError ? 'error' : null);
//             resolve(data);
//           } else {
//             setStatus('error');
//             setProgress(null);
//             let responseError = JSON.parse(xhr.response);
//             if (responseError?.message?.length) {
//               reject(responseError?.message);
//             } else {
//               reject(xhr);
//             }
//           }

//           client.refetchQueries({
//             include: [
//               refetchQueryDescriptor,
//               // GET_ME
//             ],
//           });
//         };

//         xhr.onerror = () => {
//           setStatus('error');
//           setProgress(null);
//           reject(xhr.statusText);
//         };

//         xhr.send(formData);
//       });
//     },
//     [token],
//   );

//   const uploadFileForTest = useCallback(
//     (
//       documentFiles: File[],
//       transliterationFiles: File[],
//       ast: ASTNode,
//       refetchQueryDescriptor: RefetchQueryDescriptor,
//       generateAction: string = 'Tests',
//       fileTitle: string = '',
//     ) => {
//       return new Promise((resolve, reject) => {
//         setStatus('uploading');

//         const xhr = new XMLHttpRequest();
//         const query = print(ast);

//         const formData = new FormData();

//         // Define the query and variables with separate documentFiles and transliterationFiles
//         formData.append(
//           'operations',
//           JSON.stringify({
//             query,
//             variables: {
//               input: {
//                 documentFiles: new Array(documentFiles.length).fill(null),
//                 transliterationFiles: new Array(
//                   transliterationFiles.length,
//                 ).fill(null),
//               },
//               fileTitle,
//             },
//           }),
//         );

//         // Create a map to link files to their variable paths
//         const map: { [key: string]: string[] } = {};

//         documentFiles.forEach((_, index) => {
//           map[`doc${index}`] = [`variables.input.documentFiles.${index}`];
//         });
//         transliterationFiles.forEach((_, index) => {
//           map[`trans${index}`] = [
//             `variables.input.transliterationFiles.${index}`,
//           ];
//         });
//         formData.append('map', JSON.stringify(map));

//         // Append document files
//         documentFiles.forEach((file, index) => {
//           formData.append(`doc${index}`, file);
//         });

//         // Append transliteration files
//         transliterationFiles.forEach((file, index) => {
//           formData.append(`trans${index}`, file);
//         });

//         xhr.open('POST', process.env.NEXT_PUBLIC_API_URL + '/graphql');
//         xhr.setRequestHeader('apollo-require-preflight', 'true');
//         xhr.setRequestHeader('Accept', 'application/json');
//         xhr.setRequestHeader('Authorization', `Bearer ${token}`);

//         xhr.upload.onprogress = event => {
//           if (event.lengthComputable) {
//             const threshold = 90; // ~10% for processing
//             const percentCompleted = Math.round(
//               (event.loaded * threshold) / event.total,
//             );
//             setProgress(percentCompleted);
//             if (percentCompleted >= threshold) setStatus('process');
//           }
//         };

//         xhr.onload = () => {
//           let isError = false;
//           if (xhr.status >= 200 && xhr.status < 300) {
//             const data = JSON.parse(xhr.response);
//             if (data?.errors?.length) isError = true;
//             setStatus(isError ? 'error' : null);
//             resolve(data);
//           } else {
//             setStatus('error');
//             setProgress(null);
//             let responseError = JSON.parse(xhr.response);
//             if (responseError?.message?.length) {
//               reject(responseError?.message);
//             } else {
//               reject(xhr);
//             }
//           }

//           client.refetchQueries({
//             include: [
//               refetchQueryDescriptor,
//               // GET_ME
//             ],
//           });
//         };

//         xhr.onerror = () => {
//           setStatus('error');
//           setProgress(null);
//           reject(xhr.statusText);
//         };

//         xhr.send(formData);
//       });
//     },
//     [token],
//   );
//   /**
//    * Uploads multiple files through a three-step process: obtaining upload URLs, uploading to S3, and notifying completion.
//    *
//    * @param files - Array of File objects to upload
//    * @param fileTitle - Optional title for the files (defaults to empty string)
//    * @param action - Upload action type (defaults to 'DefaultUpload')
//    * @param onProgress - Optional callback to track upload progress
//    * @param onProgress.overallProgress - Overall progress percentage (0-100)
//    * @param onProgress.fileIndex - Index of the current file being uploaded
//    * @param onProgress.fileProgress - Progress percentage for the current file
//    *
//    * @returns Promise that resolves to the completion response from the server
//    *
//    * @throws Will throw an error if any step of the upload process fails
//    *
//    * @example
//    * ```typescript
//    * const files = [file1, file2];
//    * const response = await uploadFiles(
//    *   files,
//    *   'My Document',
//    *   'DefaultUpload',
//    *   (progress, fileIndex, fileProgress) => {
//    *     console.log(`Overall: ${progress}%, File ${fileIndex}: ${fileProgress}%`);
//    *   }
//    * );
//    * ```
//    *
//    * @remarks
//    * Progress is reported in three phases:
//    * - 0-10%: Getting upload URLs
//    * - 10-80%: Uploading files to S3
//    * - 80-100%: Notifying server of completion
//    */
//   const uploadFiles = useCallback(
//     async (
//       files: File[],
//       fileTitle: string = '',
//       action: string = 'DefaultUpload',
//     ): Promise<any> => {
//       try {
//         setStatus('uploading');

//         // Step 1: Get upload URLs (10% of progress)
//         setProgress(10);
//         const urlResponse = await getUploadUrls(files, client, fileTitle);
//         const uploadUrls = urlResponse.data.uploadUrls;

//         // Step 2: Upload files to S3 (10% - 80% of progress)
//         const fileProgressMap = new Map<number, number>();
//         const uploadMetadata = await uploadFilesToS3(
//           files,
//           uploadUrls,
//           (fileIndex, fileProgress) => {
//             fileProgressMap.set(fileIndex, fileProgress);

//             // Calculate overall progress for S3 uploads (70% of total progress)
//             const totalFileProgress = Array.from(
//               fileProgressMap.values(),
//             ).reduce((sum, progress) => sum + progress, 0);
//             const avgProgress = totalFileProgress / files.length;
//             const s3Progress = Math.round(10 + avgProgress * 0.7); // 10% base + 70% for S3

//             setProgress(s3Progress);
//           },
//           (fileIndex, success, error) => {
//             if (!success) {
//               console.error(
//                 `File ${fileIndex} (${files[fileIndex].name}) upload failed:`,
//                 error,
//               );
//             }
//           },
//         );

//         // Step 3: Notify server of completion (80% - 100% of progress)
//         setProgress(85);
//         setStatus('process');
//         const completionResponse = await notifyUploadCompleted(
//           files,
//           client,
//           action,
//           fileTitle,
//           uploadMetadata,
//         );

//         setProgress(100);
//         setStatus(null);
//         client.refetchQueries({
//           include: [
//             DOCUMENT_GET_ALL,
//             //  GET_ME
//           ],
//         });
//         return completionResponse;
//       } catch (error) {
//         console.error('Upload workflow failed:', error);
//         setStatus('error');
//         setProgress(null);
//         throw error;
//       }
//     },
//     [client],
//   );

//   return {
//     uploadFile,
//     progress,
//     status,
//     uploadFileGroup,
//     uploadFileGroupForTest,
//     uploadFileForTest,
//     uploadFiles,
//   };
// }
