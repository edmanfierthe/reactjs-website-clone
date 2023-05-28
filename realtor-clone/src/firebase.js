// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtabA7ehtaxOt_YHc3pL_KJhewGhXWmUs",
  authDomain: "react-project-c6410.firebaseapp.com",
  projectId: "react-project-c6410",
  storageBucket: "react-project-c6410.appspot.com",
  messagingSenderId: "221674589981",
  appId: "1:221674589981:web:4111a98d7695df2b381bf4"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()