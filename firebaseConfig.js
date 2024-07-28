// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {initializeAuth} from 'firebase/auth'
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import { getFirestore, collection } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   projectId: process.env.projectId,
//   storageBucket: process.env.messageSenderId,
//   messagingSenderId: process.env.apiKey,
//   appId: process.env.appId,
//   measurementId: process.env.measurementId,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAb3bRp_0cwyDrBUPGEwoVvcEklg4Pv88Q",
  authDomain: "travel-buddy-62be4.firebaseapp.com",
  projectId: "travel-buddy-62be4",
  storageBucket: "travel-buddy-62be4.appspot.com",
  messagingSenderId: "660458697663",
  appId: "1:660458697663:web:65c5c131988ea6c13fa70a",
  measurementId: "G-D1CE2SCRHB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
  // persistence: browserSessionPersistence,
})

export const db = getFirestore(app)

export const usersRef = collection(db, 'users');