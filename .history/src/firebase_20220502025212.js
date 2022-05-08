import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();
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
provider.setCustomParameters({
  'login_hint': 'user@example.com'
});
const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

export {db}
export {auth}