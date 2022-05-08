import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAPv7snp4CE7AxhLl5-lbzqeeP4nYlBIzU",
  authDomain: "laranjinha-4831b.firebaseapp.com",
  databaseURL: "https://laranjinha-4831b-default-rtdb.firebaseio.com",
  projectId: "laranjinha-4831b",
  storageBucket: "laranjinha-4831b.appspot.com",
  messagingSenderId: "496935392430",
  appId: "1:496935392430:web:3abfa5a3d0f1b66da9c93f",
  measurementId: "G-B6HE4X62LH"
};
// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export {db}