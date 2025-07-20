import React, { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AuthContext } from '@/hooks/useAuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}; 