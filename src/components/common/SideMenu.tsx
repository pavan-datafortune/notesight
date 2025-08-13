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
import { ChevronDown, ChevronUp, LogOutIcon, X } from 'lucide-react-native';
import * as Keychain from 'react-native-keychain';
import { useAuth0 } from 'react-native-auth0';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteStackParamList } from '../../route/Route';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../stores/auth';

const SCREEN_WIDTH = Dimensions.get('window').width;

type SideMenuProps = {
  visible: boolean;
  onClose: () => void;
};

const mainMenuItems = [
  { title: 'Standardized Test Prep', route: 'TestPrep' },
  { title: 'Course + AP Test Prep (coming soon)', route: 'CourseAPPrep' },
  { title: 'Tutor Center (Tools)', route: 'TutorCenterTools' },
  { divider: true },
  { title: 'My Account', route: 'Account' },
  { divider: true },
  { title: 'Customer Service', route: 'CustomerService' },
  { title: 'Blog', route: 'Blog' },
  { divider: true },
];

const featureMenuItems = [
  {
    section: 'Features',
    items: [
      'AI Tutor',
      'AI Flashcards',
      'AI Study Planner',
      'AI Transcription',
      'AI Practice Tests',
      'Automated Study Guides',
    ],
  },
  {
    section: 'Solutions',
    items: [
      'For Parents',
      'For Undergraduate Students',
      'For Middle School Students',
      'For High School Students',
    ],
  },
  { section: '', items: ['Pricing', 'FAQ', 'Contact us'] },
];

export default function SideMenu({ visible, onClose }: SideMenuProps) {
  type NavigationProp = NativeStackNavigationProp<RouteStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  const { logout, isLoggedIn } = useAuthStore.getState();
  const { user, clearSession } = useAuth0();
  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const [internalVisible, setInternalVisible] = useState(visible);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  const userLogout = async (fullLogout = false) => {
    setIsLoggingOut(true);
    try {
      // Clear local credentials
      await Keychain.resetGenericPassword();
      logout();

      // Optional: Full Auth0 session logout
      if (fullLogout) {
        try {
          // Skip federated logout to avoid extra prompts unless you *really* want IdP logout
          await clearSession();
        } catch (e: any) {
          if (e.code === 'USER_CANCELLED') {
            console.log('Auth0 logout popup was cancelled');
          } else {
            console.error('Error clearing Auth0 session:', e);
          }
        }
      }

      // Close menu AFTER logout completes
      onClose && onClose();

      // Navigate to Login
      navigation.getParent()?.navigate('Login');
    } finally {
      setIsLoggingOut(false);
    }
  };

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
            <View>
              {/* Show main menu if logged in, else show features/solutions */}
              {isLoggedIn ? (
                <MenuList
                  items={mainMenuItems}
                  navigation={navigation}
                  onClose={onClose}
                />
              ) : (
                featureMenuItems.map(section =>
                  section.section ? (
                    <MenuSection
                      key={section.section}
                      title={section.section}
                      items={section.items}
                    />
                  ) : (
                    section.items.map(item => (
                      <MenuItem key={item} title={item} />
                    ))
                  ),
                )
              )}
            </View>
            {/* Always show logout if logged in */}
            {isLoggedIn && user && (
              <TouchableOpacity
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  paddingVertical: 5,
                  opacity: isLoggingOut ? 0.5 : 1,
                }}
                onPress={() => userLogout(false)}
                disabled={isLoggingOut}
              >
                <LogOutIcon color={'#000000'} />
                <Text style={{ fontSize: 16, fontWeight: '600' }}>
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

// Reusable menu list component
const MenuList = ({
  items,
  navigation,
  onClose,
}: {
  items: any[];
  navigation: any;
  onClose: any;
}) => (
  <>
    {items.map((item, idx) =>
      item.divider ? (
        <View
          key={`divider-${idx}`}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
            marginVertical: 8,
          }}
        />
      ) : item.title === 'Log Out' ? null : (
        <TouchableOpacity
          key={item.title}
          style={{ paddingVertical: 8 }}
          onPress={() => {
            navigation.navigate(item.route);
            onClose();
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.title}</Text>
        </TouchableOpacity>
      ),
    )}
  </>
);

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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 20,
    height: '100%',
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
