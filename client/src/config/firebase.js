// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXlj-Y3OpYg6WoEx0O58pPyzHRiVkPrI0",
  authDomain: "mystudies-faeb9.firebaseapp.com",
  projectId: "mystudies-faeb9",
  storageBucket: "mystudies-faeb9.appspot.com",
  messagingSenderId: "178093218266",
  appId: "1:178093218266:web:8325ed163417d8f80988e3",
  measurementId: "G-1DVQQ5Y00T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, firebaseConfig };