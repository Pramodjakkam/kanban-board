// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCskvlz9kTzzxEBaGFhUw1TQr5wiV_vXuY",
  authDomain: "kanban-board-34c86.firebaseapp.com",
  projectId: "kanban-board-34c86",
  storageBucket: "kanban-board-34c86.appspot.com",
  messagingSenderId: "183988960305",
  appId: "1:183988960305:web:510b5ccaa4d30ee49f2910"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app); // Ensure this line is present