// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgszvDH-zmVLC3EgWk79SB9e9gtUsfGMM",
  authDomain: "uploadpics-4bae3.firebaseapp.com",
  projectId: "uploadpics-4bae3",
  storageBucket: "uploadpics-4bae3.appspot.com",
  messagingSenderId: "845699089386",
  appId: "1:845699089386:web:0cb33699a0045afcd16893",
  measurementId: "G-8CDGHCQLHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
