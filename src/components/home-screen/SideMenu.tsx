import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { ChevronDown, ChevronUp, X } from 'lucide-react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

type SideMenuProps = {
  visible: boolean;
  onClose: () => void;
};

export default function SideMenu({ visible, onClose }: SideMenuProps) {
  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const [internalVisible, setInternalVisible] = useState(visible);

  useEffect(() => {
    if (visible) {
      setInternalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setInternalVisible(false);
      });
    }
  }, [visible]);

  if (!internalVisible) return null;

  return (
    <Modal transparent visible={internalVisible} animationType="none">
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <Animated.View
          style={[
            styles.menuContainer,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <ScrollView contentContainerStyle={styles.menuContent}>
            {/* <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
              <X size={20} color="#333" />
            </TouchableOpacity> */}

            <MenuSection
              title="Features"
              items={[
                'AI Tutor',
                'AI Flashcards',
                'AI Study Planner',
                'AI Transcription',
                'AI Practice Tests',
                'Automated Study Guides',
              ]}
            />

            <MenuSection
              title="Solutions"
              items={[
                'For Parents',
                'For Undergraduate Students',
                'For Middle School Students',
                'For High School Students',
              ]}
            />

            <MenuItem title="Pricing" />
            <MenuItem title="FAQ" />
            <MenuItem title="Contact us" />
          </ScrollView>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

const MenuSection = ({ title, items }: { title: string; items: string[] }) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    const finalValue = expanded ? 0 : 1;
    setExpanded(!expanded);

    Animated.timing(animation, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, items.length * 24],
  });

  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.section}>
      <TouchableOpacity style={styles.sectionHeader} onPress={toggleExpand}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </TouchableOpacity>
      {items && (
        <Animated.View
          style={{
            overflow: 'hidden',
            height: heightInterpolate,
            opacity: opacityInterpolate,
          }}
        >
          {items.map(item => (
            <Text style={styles.itemText} key={item}>
              {item}
            </Text>
          ))}
        </Animated.View>
      )}
    </View>
  );
};

const MenuItem = ({ title }: { title: string }) => (
  <Text style={[styles.sectionTitle, { marginBottom: 30 }]}>{title}</Text>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    flexDirection: 'row',
    justifyContent: 'flex-end', // slide from right
  },
  menuContainer: {
    width: SCREEN_WIDTH * 0.6,
    height: '100%',
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 30,
  },
  menuContent: {
    paddingTop: 50,
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 14,
    marginVertical: 4,
    color: '#333',
    paddingLeft: 8,
  },
});
