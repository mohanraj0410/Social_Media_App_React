import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBQJ3xHRGYI7m4fGd4TLhLrAxao9m0JFw",
  authDomain: "instagram-c0e3f.firebaseapp.com",
  projectId: "instagram-c0e3f",
  storageBucket: "instagram-c0e3f.appspot.com",
  messagingSenderId: "6026345784",
  appId: "1:6026345784:web:0db0643114fa2d578cd5cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
