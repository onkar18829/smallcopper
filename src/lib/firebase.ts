import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// These values were extracted from the provided google-services.json
// Note: Some web-specific fields (authDomain, measurementId) are synthesized 
// or need to be provided for a full web implementation.
const firebaseConfig = {
  apiKey: "AIzaSyD9h8SX7xbTc2tc4CVc5YX2aVz1wX9_-Cg",
  authDomain: "small-copper.firebaseapp.com",
  projectId: "small-copper",
  storageBucket: "small-copper.firebasestorage.app",
  messagingSenderId: "798569356370",
  appId: "1:798569356370:android:10211279333c3da049938b" // Using the Android App ID as placeholder if Web ID isn't provided
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};
