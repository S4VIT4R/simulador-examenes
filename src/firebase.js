// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQaja_RwMdRapQhszZV-eRjj27--w4mks",
  authDomain: "simulador4-784df.firebaseapp.com",
  projectId: "simulador4-784df",
  storageBucket: "simulador4-784df.appspot.com",
  messagingSenderId: "852767608504",
  appId: "1:852767608504:web:b9f1540a0d12e28671ee4d"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const docs = doc;
export const firestore = getFirestore;
export const collections = collection;
export const addDocs = addDoc;
export const getDoc = getDocs;
export const setDocs = setDoc;

