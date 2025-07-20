import { createContext, useContext } from "react";
import { User } from "firebase/auth";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ user: User | null; error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: Error | null }>;
  signInWithGoogle: () => Promise<{ user: User | null; error: Error | null }>;
  signInWithGithub: () => Promise<{ user: User | null; error: Error | null }>;
  sendVerificationEmail: () => Promise<{ error: Error | null }>;
  refreshUser: () => Promise<void>;
  logout: () => Promise<{ error: Error | null }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
