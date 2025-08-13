import { FileText } from 'lucide-react-native';
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

export default function FileTiles({ files }: any) {
  const renderItem = ({ item }: any) => {
    const isImage = item.type === 'image';
    return (
      <View style={styles.card}>
        {isImage ? (
          <Image source={{ uri: item.filePath }} style={styles.thumbnail} />
        ) : (
          <View style={styles.pdfIconContainer}>
            <FileText size={40} color="#e63946" />
          </View>
        )}

        <View style={styles.details}>
          <Text style={styles.fileName} numberOfLines={1}>
            {item.fileName}
          </Text>
          <Text style={styles.fileDate}>
            {new Date(item.createdAt).toLocaleString()}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={files}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 2,
    borderWidth: 1,
    borderColor: 'gray',
  },
  thumbnail: {
    height: 80,
    width: '100%',
  },
  pdfIconContainer: {
    height: 80,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    padding: 10,
  },
  fileName: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 4,
  },
  fileDate: {
    fontSize: 13,
    color: '#888',
  },
});
