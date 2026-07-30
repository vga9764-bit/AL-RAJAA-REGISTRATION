// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAn4jMJGdj3EM6J6rg-gRTakETybQpGUVE",
  authDomain: "alrajjaapp.firebaseapp.com",
  projectId: "alrajjaapp",
  storageBucket: "alrajjaapp.firebasestorage.app",
  messagingSenderId: "702047164548",
  appId: "1:702047164548:web:2fc02fd3612b3a61e88ad1",
  measurementId: "G-7041F62GNC"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
