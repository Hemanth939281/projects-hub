// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaYtTjN2iexD_wpv84L1BeZikn6mMk2J8",
  authDomain: "projects-portal-8eb67.firebaseapp.com",
  projectId: "projects-portal-8eb67",
  storageBucket: "projects-portal-8eb67.appspot.com",
  messagingSenderId: "879316250909",
  appId: "1:879316250909:web:127d41d4e97662271571f4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app) 