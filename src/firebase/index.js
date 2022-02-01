import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyCi7Xs_EgWCVCOaqDe8kcFl53zhNwnxKPw",
    authDomain: "meant-to-be-free.firebaseapp.com",
    projectId: "meant-to-be-free",
    storageBucket: "meant-to-be-free.appspot.com",
    messagingSenderId: "465575335751",
    appId: "1:465575335751:web:b3f998853aa2ec92ce5e62"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const database = firebase.database();
