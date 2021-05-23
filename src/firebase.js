import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAuTlvCzCnKPtT6ymHPvheCymTnDRjq2Js",
  authDomain: "link-storage-react.firebaseapp.com",
  projectId: "link-storage-react",
  storageBucket: "link-storage-react.appspot.com",
  messagingSenderId: "933823261631",
  appId: "1:933823261631:web:7d1a23f4805e2ee8518f0a",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

const db = fb.firestore();

export default db;
