// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  orderBy // Ajoutez cette import
} from "firebase/firestore";

// Votre configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD2wcYnWc2HQuPp2nixNi49hAjgK3WQOQM",
  authDomain: "qrconnector-cfcd3.firebaseapp.com",
  projectId: "qrconnector-cfcd3",
  storageBucket: "qrconnector-cfcd3.firebasestorage.app",
  messagingSenderId: "682931039865",
  appId: "1:682931039865:web:2bc1d0bce61edfebb6aea8",
  measurementId: "G-HFNQRWS4QK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export { 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  orderBy // Exportez orderBy
};
