// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAo4pcNrshIWOSL0dK3f8HaeEDqre0cZTo",
  authDomain: "pantry-management-app-d9da0.firebaseapp.com",
  projectId: "pantry-management-app-d9da0",
  storageBucket: "pantry-management-app-d9da0.appspot.com",
  messagingSenderId: "387305144916",
  appId: "1:387305144916:web:65444a09f69b8652dae3c1",
  measurementId: "G-QSW076L4NV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app)

export const firebaseAuth = getAuth(app); //added


export {firestore}