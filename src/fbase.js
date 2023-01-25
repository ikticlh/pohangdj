import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

console.log(firebase);

const firebaseConfig = {
    apiKey:"AIzaSyDem1lQkQRlL8CzmpEsXfIESP2PI-tVqDM",
    authDomain:"pohangdj-245a8.firebaseapp.com",
    projectId:"pohangdj-245a8",
    storageBucket:"pohangdj-245a8.appspot.com",
    messagingSenderId:"109793611406",
    appId:"1:1097936114063:web:d24d145a7e59a83277fbfa"
  };

firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
export const dbService = firebase.firestore();