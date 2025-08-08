import { Platform } from 'react-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  domain: 'dev-7v1ogpzhapj6e1en.us.auth0.com',
  clientId: 'Hr4VAx80SfytM23nG9Kzh48HFK8EbWUJ',
});

export default auth0;

export const auth0Config = {
  clientId: 'JivXjoHzUgVKVkeyz6NPLwnxyrphS5d2',
  domain: 'dev-ihammamxgdm4t4va.us.auth0.com',
  appBundleId: 'com.notesight.app',
};

export const constructRedirectUrl = () => {
  const { appBundleId, domain } = auth0Config;
  const platformPath =
    Platform.OS === 'android'
      ? `android/${appBundleId}/callback`
      : `ios/${appBundleId}/callback`;

  return `${appBundleId}.auth0://${domain}/${platformPath}`;
};
