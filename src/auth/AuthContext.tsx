import React from 'react';
import { auth0Config } from './auth0';
import { Auth0Provider, useAuth0 } from 'react-native-auth0';

export const AuthProvider = ({ children }: { children: any }) => {
  const AUTH0_DOMAIN = auth0Config.domain;
  const AUTH0_CLIENT_ID = auth0Config.clientId;

  return (
    <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
      {children}
    </Auth0Provider>
  );
};
