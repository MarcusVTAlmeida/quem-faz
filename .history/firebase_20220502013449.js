// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPv7snp4CE7AxhLl5-lbzqeeP4nYlBIzU",
  authDomain: "laranjinha-4831b.firebaseapp.com",
  databaseURL: "https://laranjinha-4831b-default-rtdb.firebaseio.com",
  projectId: "laranjinha-4831b",
  storageBucket: "laranjinha-4831b.appspot.com",
  messagingSenderId: "496935392430",
  appId: "1:496935392430:web:3d80e3af2875c4f8a9c93f",
  measurementId: "G-1ZEV05CDB1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);