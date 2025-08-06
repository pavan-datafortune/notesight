import { Menu } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';

const DropdownList = () => {
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const options = ['Features', 'Solutions', 'Pricing', 'FAQ', 'Contact us'];

  const handleSelect = (item: any) => {
    setSelectedItem(item);
    setVisible(false);
    // handle navigation or actions here
    console.log('Selected:', item);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Menu size={32} color="black" />
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => setVisible(false)}
        >
          <View style={styles.dropdown}>
            <FlatList
              data={options}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  style={styles.item}
                >
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  dropdown: {
    backgroundColor: 'white',
    marginHorizontal: 40,
    borderRadius: 8,
    paddingVertical: 8,
    elevation: 5,
  },
  item: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
});

export default DropdownList;
