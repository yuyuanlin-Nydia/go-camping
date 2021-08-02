import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";



var firebaseConfig = {
  apiKey: "AIzaSyCpcEeWtn93PmlgBUZ09iaHiYVSvpklTzQ",
  authDomain: "gocamping-8c9d3.firebaseapp.com",
  projectId: "gocamping-8c9d3",
  storageBucket: "gocamping-8c9d3.appspot.com",
  messagingSenderId: "783872527299",
  appId: "1:783872527299:web:9d76f71e6eeab071dd4b76",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const firebaseAuth = firebase.auth();
export const fireBase = firebase;