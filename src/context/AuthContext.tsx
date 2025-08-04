// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import auth0 from '../lib/auth0';

type User = {
  name?: string;
  email?: string;
  picture?: string;
  [key: string]: any;
};

type AuthContextType = {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);

//   const login = async () => {
//     try {
//       const credentials = await auth0.webAuth.authorize({
//         scope: 'openid profile email',
//       });
//       const userInfo = await auth0.auth.userInfo({
//         token: credentials.accessToken,
//       });

//       setUser({ ...userInfo, accessToken: credentials.accessToken });
//     } catch (error) {
//       console.error('Login error:', error);
//     }
//   };

//   const logout = async () => {
//     try {
//       await auth0.webAuth.clearSession();
//     } catch (error) {
//       console.warn('Logout error:', error);
//     }
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within AuthProvider');
//   return context;
// };

// src/context/AuthContext.tsx

// auth/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
import auth0 from '../lib/auth0';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  const login = async () => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email',
      });
      const userInfo = await auth0.auth.userInfo({
        token: credentials.accessToken,
      });
      setUser({ ...userInfo, accessToken: credentials.accessToken });
    } catch (err) {
      console.log('Login error:', err);
    }
  };

  const logout = async () => {
    try {
      await auth0.webAuth.clearSession();
      setUser(null);
    } catch (err) {
      console.log('Logout error:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
