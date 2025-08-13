import { SquareDashedMousePointer, X } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { pick } from '@react-native-documents/picker';
import { getPresignedUrl } from '../../service/file-upload/GetPresignedURL';
import { uploadFileToS3 } from '../../service/file-upload/UploadFileToS3';
import { completeUpload } from '../../service/file-upload/CompleteUpload';
import { getMediaType } from '../../utils/getMediaTypes';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export const UploadModal = ({ visible, onClose }: Props) => {
  const [files, setFiles] = useState<any>([]);
  const [isUploading, setUploading] = useState<any>([]);
  console.log('visible>>>', visible);
  const pickDocument = async () => {
    try {
      const result = await pick();
      setFiles(result);
    } catch (err) {
      console.error('Error picking document: ', err);
    }
  };

  // const pickDocument = async () => {
  //   try {
  //     const results = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //       allowMultiSelection: false, // true if you want multiple
  //     });

  //     const files = results.map(file => ({
  //       uri: file.uri,
  //       name: file.name,
  //       size: file.size,
  //       type: file.type, // MIME type if available
  //     }));

  //     setFiles(files);
  //     console.log('Selected files:', files);
  //   } catch (err: any) {
  //     if (err?.code === 'DOCUMENT_PICKER_CANCELED') {
  //       console.log('User cancelled document picker');
  //     } else {
  //       console.error('Error picking document:', err);
  //     }
  //   }
  // };

  async function handleUpload() {
    try {
      setUploading(true);
      files.map(async (file: any) => {
        console.log('HIT file', file);
        const preSignedUrl = await getPresignedUrl(file.name);
        console.log('preSignedUrl>>>>', preSignedUrl);
        const s3Response = await uploadFileToS3(file, preSignedUrl?.url);
        console.log('s3Response>>>>', s3Response);
        if (s3Response.ok) {
          const filTitle = file.name.replace(/\.[^/.]+$/, '');
          const fileType = getMediaType(file.type);
          const completeUploadRes = await completeUpload({
            s3Key: preSignedUrl?.key,
            fileTitle: filTitle,
            fileType: fileType,
          });
          console.log('completeUploadRes>>>>', completeUploadRes);
        }
      });
      setUploading(false);
    } catch (error) {
      console.error('[FileUpload] Upload error:', error);
    }
  }

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={() => {}}>
          <View style={styles.header}>
            <Text style={styles.title}>Upload your file</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={20} color="#000" />
            </TouchableOpacity>
          </View>

          <Pressable style={styles.dropZone} onPress={pickDocument}>
            <SquareDashedMousePointer size={32} color="#7B7B7B" />
            <Text style={styles.dropText}>
              Click or Drag and drop your files
            </Text>
            {files && (
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                {files.map((each: any, key: any) => (
                  <Text key={key} style={styles.fileNames}>
                    {each?.name}
                  </Text>
                ))}
              </View>
            )}
          </Pressable>

          <Text style={styles.supportedTypes}>
            .aac, .webm, .mov, .mp4, .mp3, .avi, .png, .jpg, .jpeg, .pdf, .pptx,
            .docx, .xlsx, .xls, .csv
          </Text>
          <Text style={styles.limits}>
            Doc File Max – 500 Mb, Media File Max – 1.5 Gb
          </Text>

          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: 320,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  dropZone: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#C7C7C7',
    borderRadius: 12,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  dropText: {
    marginTop: 10,
    fontSize: 14,
    color: '#7B7B7B',
  },
  fileNames: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 600,
  },
  supportedTypes: {
    fontSize: 12,
    color: '#8B8B8B',
    textAlign: 'center',
    marginTop: 4,
  },
  limits: {
    fontSize: 12,
    color: '#8B8B8B',
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 16,
  },
  uploadButton: {
    backgroundColor: '#2D70FD',
    paddingVertical: 10,
    borderRadius: 24,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
