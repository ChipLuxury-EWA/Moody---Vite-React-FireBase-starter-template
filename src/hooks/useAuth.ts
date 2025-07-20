import { useState, useEffect } from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Send verification email after successful signup
      if (result.user) {
        await sendEmailVerification(result.user);
      }

      return { user: result.user, error: null };
    } catch (error) {
      return { user: null, error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { user: result.user, error: null };
    } catch (error) {
      return { user: null, error: error as Error };
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      return { user: result.user, error: null };
    } catch (error) {
      return { user: null, error: error as Error };
    }
  };

  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      return { user: result.user, error: null };
    } catch (error) {
      return { user: null, error: error as Error };
    }
  };

  const sendVerificationEmail = async () => {
    if (!user) return { error: new Error("No user found") };

    const actionCodeSettings = {
      url: `https://${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}/email-verified`, // URL to redirect to after verification
      handleCodeInApp: true, // This is crucial for web apps to handle verification within the app
    };

    try {
      await sendEmailVerification(user, actionCodeSettings);
      console.log("Verification email sent to", user.email);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const refreshUser = async () => {
    if (!user) return;

    try {
      await user.reload();
      setUser({ ...user });
    } catch (error) {
      console.error("Error refreshing user:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const updateUserProfile = async (displayName: string, photoURL: string) => {
    if (!user) return;

    try {
      await updateProfile(auth.currentUser as User, { displayName, photoURL });
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithGithub,
    sendVerificationEmail,
    refreshUser,
    logout,
    updateUserProfile,
  };
};
