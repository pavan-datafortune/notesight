import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import { Upload, FileText, FileImage } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteStackParamList } from '../../route/Route';
import { useNavigation } from '@react-navigation/native';
import { pick } from '@react-native-documents/picker';
import { getPresignedUrl } from '../../service/file-upload/GetPresignedURL';
import { uploadFileToS3 } from '../../service/file-upload/UploadFileToS3';
import { getMediaType } from '../../utils/getMediaTypes';
import { completeUpload } from '../../service/file-upload/CompleteUpload';

const iconColors = {
  application: '#7B46E4', // purple
  image: '#3B62F6', // blue
};

type FileType = 'application' | 'image';

interface FileItem {
  id: string;
  fileName: string;
  date: string;
  type: FileType;
  ownerId: number;
  filePath: string;
  ext: string;
  summaryStatus: string;
  __typename: string;
  mePermission: string | null;
  tag: string | null;
}

interface FileListItemProps {
  file: FileItem;
  selected: boolean;
  onSelect: (id: string) => void;
}

const FileListItem = ({ file, selected, onSelect }: FileListItemProps) => {
  return (
    <TouchableOpacity
      style={[styles.fileRow, selected && { backgroundColor: '#eaeaea' }]}
      onPress={() => onSelect(file.id)}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: iconColors[file.type] || '#ccc' },
        ]}
      >
        {file.type === 'application' ? (
          <FileText color={'#FFF'} />
        ) : (
          <FileImage color={'#FFF'} />
        )}
        <Text style={styles.iconLabel}>
          {file.type === 'application'
            ? 'Document'
            : `${file.type.charAt(0).toUpperCase() + file.type.slice(1)}`}
        </Text>
      </View>

      <View style={styles.fileInfo}>
        <Text style={styles.fileName} numberOfLines={1}>
          {file.fileName}
        </Text>
        <Text style={styles.fileDate}>{file.date}</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
          {selected && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function UploadFilesForServiceModal({
  selectedService,
  visible,
  files,
  onClose,
  onUpdate,
}: any) {
  type NavigationProp = NativeStackNavigationProp<RouteStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  const [newFiles, setNewFiles] = useState<any>([]);
  const [fileTitle, setFileTitle] = useState('');
  const [isUploadFile, setUploadFile] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: any) => {
    setSelectedIds((prev: any) =>
      prev.includes(id) ? prev.filter((x: any) => x !== id) : [...prev, id],
    );
  };

  const pickDocument = async () => {
    try {
      const result = await pick();
      console.log('Picked files:', result);
      setNewFiles(result);
    } catch (err) {
      console.error('Error picking document: ', err);
    }
  };

  async function handleUpload() {
    try {
      // setUploading(true);
      for (const file of newFiles) {
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
          selectedIds.includes(completeUploadRes.id);
          setNewFiles([]);
          await onUpdate();
          // setUploading(false);
        }
      }
      // setUploading(false);
    } catch (error) {
      // setUploading(false);
      console.error('[FileUpload] Upload error:', error);
    }
  }

  console.log('selectedIds>>>>', selectedIds);
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{selectedService.title}</Text>
            <TouchableOpacity
              onPress={() => {
                setNewFiles([]);
                onClose();
              }}
            >
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>File title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter File title"
            value={fileTitle}
            onChangeText={setFileTitle}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { borderColor: isUploadFile ? '#2B6ED3' : '#ECF4FA' },
              ]}
              onPress={() => setUploadFile(true)}
            >
              <Upload color="#3BA3F3" size={20} />
              <Text style={styles.actionText}>Upload file</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { borderColor: !isUploadFile ? '#2B6ED3' : '#ECF4FA' },
              ]}
              onPress={() => setUploadFile(false)}
            >
              <FileText color="#3BA3F3" size={20} />
              <Text style={styles.actionText}>Select Files</Text>
            </TouchableOpacity>
          </View>

          {isUploadFile ? (
            <TouchableOpacity style={styles.dragArea} onPress={pickDocument}>
              <Text style={styles.dragText}>
                Click or Drag and drop your files
              </Text>
              <Text style={styles.fileTypes}>
                .aac, .webm, .mov, .mp4, .mp3, .avi, .png, .jpg, .jpeg, .pdf,
                .ppt, .pptx, .docx, .xlsx, .xls, .csv
              </Text>
              <Text style={styles.fileLimits}>
                Doc File Max - 500 Mb, Media File Max - 1.5 Gb
              </Text>

              {newFiles && (
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                  {newFiles.map((each: any, key: any) => (
                    <Text key={key} style={styles.fileNames}>
                      {each?.name}
                    </Text>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          ) : (
            <View style={{ height: 200 }}>
              {files.length === 0 ? (
                <Text style={{ textAlign: 'center', marginTop: 20 }}>
                  No files available. Please select files.{' '}
                </Text>
              ) : (
                <FlatList
                  data={files}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <FileListItem
                      file={item}
                      selected={selectedIds.includes(item.id)}
                      onSelect={toggleSelect}
                    />
                  )}
                  ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                  contentContainerStyle={{ padding: 16 }}
                />
              )}
            </View>
          )}

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={async () => {
              await handleUpload();
              await onClose();
              navigation.navigate(selectedService.screen, {
                documentIds: selectedIds,
              });
              setSelectedIds([]);
            }}
          >
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  closeText: {
    fontSize: 24,
    color: '#999',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#ECF4FA',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
  },
  actionText: {
    fontSize: 12,
    color: '#3BA3F3',
    fontWeight: '600',
  },
  dragArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  dragText: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  fileTypes: {
    fontSize: 10,
    color: '#888',
    textAlign: 'center',
  },
  fileLimits: {
    fontSize: 10,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 4,
  },
  uploadButton: {
    backgroundColor: '#2B6ED3',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  //

  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 8,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: { fontSize: 24, color: '#fff' },
  fileNames: {
    fontSize: 14,
    fontWeight: 600,
  },
  iconLabel: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    marginTop: 4,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  fileDate: {
    fontSize: 12,
    color: '#777',
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: '#ccc',
  },
  checkboxSelected: {
    backgroundColor: '#3B62F6',
    borderColor: '#3B62F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});
