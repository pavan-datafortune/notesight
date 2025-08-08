export const uploadFileToS3 = async (file: File, presignedUrl: string) => {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type, // e.g. image/png or application/pdf
      'x-amz-server-side-encryption': 'AES256', // <- REQUIRED!
    },
    body: file,
  });

  console.log('S3 API', response);

  if (response.ok) {
    console.log('✅ Upload successful');
  } else {
    console.error('❌ Upload failed', await response.text());
  }
  return response;
};
