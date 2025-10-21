// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAhmm7k8VLAfSWi-RazHM7oHfBG5BCEN2s",
    authDomain: "quizgame-login-form.firebaseapp.com",
    projectId: "quizgame-login-form",
    storageBucket: "quizgame-login-form.firebasestorage.app",
    messagingSenderId: "738834776023",
    appId: "1:738834776023:web:c4581e984670a315e09592"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);