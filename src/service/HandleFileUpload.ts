import { getPresignedUrl } from '../api/file-upload/GetPresignedURL';

const handleUpload = async () => {
  const fileName = 'Screenshot 2025-08-07 at 6.10.51 PM.png';
  const fileUri = 'file:///path/to/Screenshot.png'; // Replace with real file URI

  const { url, key } = await getPresignedUrl(fileName);
  await uploadToS3({ fileUri, presignedUrl: url });

  console.log('File uploaded to S3 key:', key);
};

const uploadToS3 = async ({ fileUri, presignedUrl }: any) => {
  // Read file content as blob (or buffer) depending on your platform
  const response = await fetch(fileUri); // fileUri should be like: file:///path/to/file.png
  const blob = await response.blob(); // on React Native, you may use react-native-fs or expo-file-system

  const uploadResponse = await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'image/png', // or the correct MIME type of your file
    },
    body: blob,
  });

  if (uploadResponse.ok) {
    console.log('✅ File uploaded successfully');
  } else {
    console.error('❌ Failed to upload file', await uploadResponse.text());
  }
};
