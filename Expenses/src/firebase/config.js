import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyATUvej1pdTm5TkSH1BWaxBwrmcDv681JY",
    authDomain: "expensetracker-54f56.firebaseapp.com",
    projectId: "expensetracker-54f56",
    storageBucket: "expensetracker-54f56.appspot.com",
    messagingSenderId: "798725141719",
    appId: "1:798725141719:web:e9dbf7f621f1008449ec92",
    measurementId: "G-EY3DGHZ4YL"
  };


initializeApp(firebaseConfig);

const db = getFirestore();
export default db