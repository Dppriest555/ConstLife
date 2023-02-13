// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { enableIndexedDbPersistence } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnLrJv0NTIEzNkKgpmHKHLIca6Uzic-Hk",
  authDomain: "constlife-a94ad.firebaseapp.com",
  projectId: "constlife-a94ad",
   // storageBucket: "constlife-a94ad.appspot.com",
  messagingSenderId: "1069523709677",
  appId: "1:1069523709677:web:4c8f0ae9b28a2cdc1a66e4",
  measurementId: "G-J9T4EJ4GTT",
  storageBucket: 'gs://constlife-a94ad.appspot.com/'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore();


enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code === 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code === 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });