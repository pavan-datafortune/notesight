import React from 'react';
import { auth0Config } from './auth0';
import { Auth0Provider } from 'react-native-auth0';

export const AuthProvider = ({ children }: { children: any }) => {
  const AUTH0_DOMAIN = auth0Config.domain; //'dev-7v1ogpzhapj6e1en.us.auth0.com';
  const AUTH0_CLIENT_ID = auth0Config.clientId; //'Hr4VAx80SfytM23nG9Kzh48HFK8EbWUJ';

  return (
    <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
      {children}
    </Auth0Provider>
  );
};
