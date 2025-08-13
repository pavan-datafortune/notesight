import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

const TEST_OPTIONS = [
  'SAT',
  'PSAT/NMSQT',
  'PSAT 8/9',
  'PSAT 10',
  'ACT',
  'Other',
];

export default function TestPreparationModal({
  visible,
  onClose,
}: //   onNext,
any) {
  const [selected, setSelected] = useState('');
  const [otherText, setOtherText] = useState('');

  const handleOptionSelect = (option: string) => {
    setSelected(option);
    if (option !== 'Other') setOtherText('');
  };

  //   const handleNext = () => {
  //     if (selected === 'Other') {
  //       onNext(otherText);
  //     } else {
  //       onNext(selected);
  //     }
  //   };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Create Your Study Plan</Text>
          <Text style={styles.subtitle}>
            How would you like to customize your study plan?
          </Text>
          <Text style={styles.sectionTitle}>Test Preparation</Text>
          <Text style={styles.description}>
            Let's personalize your learning experience based on your goals
          </Text>
          <Text style={styles.question}>What test are you preparing for ?</Text>
          {TEST_OPTIONS.map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.option,
                selected === option && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect(option)}
            >
              <View style={styles.radioCircle}>
                {selected === option && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
          {selected === 'Other' && (
            <TextInput
              style={styles.input}
              placeholder="Please specify"
              value={otherText}
              onChangeText={setOtherText}
            />
          )}

          {otherText && (
            <Text style={styles.infoText}>
              *We are currently helping SAT / PSAT students. We will inform you
              when we are ready help you with this topic.*
            </Text>
          )}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.nextButton,
                (!selected || (selected === 'Other' && !otherText)) && {
                  opacity: 0.5,
                },
              ]}
              //   onPress={handleNext}
              disabled={!selected || (selected === 'Other' && !otherText)}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(17, 24, 39, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    elevation: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: '#555',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 8,
  },
  description: {
    fontSize: 12,
    color: '#222',
    marginBottom: 16,
  },
  question: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 4,
    backgroundColor: '#F9F9F9',
  },
  selectedOption: {
    backgroundColor: '#E8F0FE',
  },
  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#fff',
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#4285F4',
  },
  optionText: {
    fontSize: 13,
    color: '#222',
  },
  input: {
    borderWidth: 1,
    borderColor: '#4285F4',
    borderRadius: 6,
    padding: 8,
    marginTop: 8,
    marginBottom: 4,
    fontSize: 15,
  },
  infoText: {
    color: '#2563eb',
    fontSize: 10,
    marginTop: 8,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  closeButton: {
    backgroundColor: '#F4F4F4',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#222',
    fontWeight: '600',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
