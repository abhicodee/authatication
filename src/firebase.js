// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyBIme1m42k1gWijXu-3-rVWFQSDrGvaEck",
  authDomain: "authtication-b9499.firebaseapp.com",
  projectId: "authtication-b9499",
  storageBucket: "authtication-b9499.appspot.com",
  messagingSenderId: "1049894938839",
  appId: "1:1049894938839:web:506efba10559cffe65a892"
};
export const app = initializeApp(firebaseConfig);
export const provider=new GoogleAuthProvider();
export const auth=getAuth(); 
export  const db = getFirestore(app);