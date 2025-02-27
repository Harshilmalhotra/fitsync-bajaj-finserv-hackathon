import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnK_0T79JkqYwWKvdFPE2zJ6bhhN_3R30",
  authDomain: "fittech-5a96e.firebaseapp.com",
  projectId: "fittech-5a96e",
  storageBucket: "fittech-5a96e.firebasestorage.app",
  messagingSenderId: "842408184838",
  appId: "1:842408184838:web:c755e5b24a2d2c60c8c787",
  measurementId: "G-EH7DEN15XV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);