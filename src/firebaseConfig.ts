import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSfotCS7KKom7Tgu1veGK0FMSr9y_jpXM",
  authDomain: "socialmedia-app-a5add.firebaseapp.com",
  projectId: "socialmedia-app-a5add",
  storageBucket: "socialmedia-app-a5add.firebasestorage.app",
  messagingSenderId: "264797620935",
  appId: "1:264797620935:web:e7abfe37feaa35a7b94ce2",
  measurementId: "G-Q81KB261K9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
