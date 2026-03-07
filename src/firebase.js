import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBz7HxuvT1EF-enAe2SdBwcsh_Ny6X8piM",
  authDomain: "rupeelog.firebaseapp.com",
  projectId: "rupeelog",
  storageBucket: "rupeelog.firebasestorage.app",
  messagingSenderId: "910053376378",
  appId: "1:910053376378:web:97053cf751e5c8e2f796c3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);