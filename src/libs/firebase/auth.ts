// app/libs/firebase/auth.ts
import {
  type User,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, // Added for email login
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
} from 'firebase/auth';
import { firebaseAuth } from './firebase';

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(firebaseAuth, callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(firebaseAuth, provider);

    if (!result || !result.user) {
      throw new Error('Google sign in failed');
    }
    return result.user.uid;
  } catch (error) {
    console.error('Error signing in with Google');
  }
}

export async function signOutWithGoogle() {
  try {
    await firebaseAuth.signOut();
  } catch (error) {
    console.error('Error signing out with Google');
  }
}

// Function to sign up with email and password
export async function signUpWithEmail(email: string, password: string) {
  try {
    const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    if (!result || !result.user) {
      throw new Error('Email sign up failed');
    }
    return result.user.uid;
  } catch (error) {
    console.error('Error signing up with email');
  }
}

// Function to sign in with email and password
export async function signInWithEmail(email: string, password: string) {
  try {
    const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
    if (!result || !result.user) {
      throw new Error('Email sign in failed');
    }
    return result.user.uid;
  } catch (error) {
    console.error('Error signing in with email');
  }
}
