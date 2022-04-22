// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyvw4KZnYoHlMNp16FQ86lm_yehPZeb3E",
  authDomain: "simulador5-2272d.firebaseapp.com",
  projectId: "simulador5-2272d",
  storageBucket: "simulador5-2272d.appspot.com",
  messagingSenderId: "274318386902",
  appId: "1:274318386902:web:fe905534a1424dcaadcb77"
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

