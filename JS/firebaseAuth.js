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

function showMessage(message, type) {
  const messageBox = document.getElementById("messageBox");
  messageBox.textContent = message;
  
  // Remove old classes and apply the new one
  messageBox.className = type; 
  messageBox.style.display = "block";
  
  // Hide after 3 seconds
  setTimeout(() => {
    messageBox.style.display = "none";
  }, 3000);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const signUp = document.getElementById("signUpBtn");
signUp.addEventListener('click', async (event)=>{
    event.preventDefault();
    const username = document.getElementById("rUserName").value;
    const email = document.getElementById("rEmail").value;
    const password = document.getElementById("rPassword").value;
    const confirmPassword = document.getElementById("rConfirmPassword").value;

    if(password !== confirmPassword){
        showMessage("Passwords do not match!");
        return;
    }

    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save to firebase
        await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: email
        })

        showMessage("Account Created Successfully!");
        window.location.href = "login.html";
    }
    catch (error) {
        if (error.code === "auth/email-already-in-use") {
            showMessage("Email Address Already Exists!");
        } else {
            showMessage("Unable to create user: " + error.message);
        }
        console.error("Error:", error);
    }
})
