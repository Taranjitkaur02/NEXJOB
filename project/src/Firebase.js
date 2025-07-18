// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZaYffgv6_QnGhQgiQQPh0sCkxt5n4kVM",
  authDomain: "nexjob-fa04f.firebaseapp.com",
  projectId: "nexjob-fa04f",
  storageBucket: "nexjob-fa04f.firebasestorage.app",
  messagingSenderId: "363365075234",
  appId: "1:363365075234:web:e0e439f9edd59e12767d7b",
  measurementId: "G-8RQQWBJKSQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const Auth = getAuth()
export const db=getFirestore()
export const companyDB = getFirestore()