import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCSvV-7wRUkq_6SMdJKp7JLOZMpCr14yb0",
    authDomain: "rage-tbc.firebaseapp.com",
    databaseURL: "https://rage-tbc-default-rtdb.firebaseio.com",
    projectId: "rage-tbc",
    storageBucket: "rage-tbc.appspot.com",
    messagingSenderId: "928801752431",
    appId: "1:928801752431:web:e9a5a26bfd607e81d5549a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth()
  export const db = firebase.firestore()