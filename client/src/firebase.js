// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
// import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZP19gKuZX05CQZ16Vl8cHWvwMBMlEMTo",
  authDomain: "the-symposium.firebaseapp.com",
  projectId: "the-symposium",
  storageBucket: "the-symposium.appspot.com",
  messagingSenderId: "698613168245",
  appId: "1:698613168245:web:9de2efe826f820d92fe03c",
  measurementId: "G-38Y4VXTPRP"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;