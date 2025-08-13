import { Platform } from 'react-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  clientId: 'Hr4VAx80SfytM23nG9Kzh48HFK8EbWUJ',
  domain: 'dev-7v1ogpzhapj6e1en.us.auth0.com',
});

// const auth0 = new Auth0({
//   clientId: 'JivXjoHzUgVKVkeyz6NPLwnxyrphS5d2',
//   domain: 'dev-ihammamxgdm4t4va.us.auth0.com',
// });

export default auth0;

export const auth0Config = {
  clientId: 'Hr4VAx80SfytM23nG9Kzh48HFK8EbWUJ',
  domain: 'dev-7v1ogpzhapj6e1en.us.auth0.com',
};
// export const auth0Config = {
//   clientId: 'JivXjoHzUgVKVkeyz6NPLwnxyrphS5d2',
//   domain: 'dev-ihammamxgdm4t4va.us.auth0.com',
// };

export const constructRedirectUrl = () => {
  return Platform.OS === 'ios'
    ? 'notesight://ios/callback'
    : 'notesight://android/callback';
};
