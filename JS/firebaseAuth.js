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

// DISPLAY SHOWMESSAGE FUNCTION
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
if (signUp) {
  signUp.addEventListener('click', async (event) => {
    event.preventDefault();
    const username = document.getElementById("rUserName").value;
    const email = document.getElementById("rEmail").value;
    const password = document.getElementById("rPassword").value;
    const confirmPassword = document.getElementById("rConfirmPassword").value;

    if (password !== confirmPassword) {
      showMessage("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save to Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email
      });

      showMessage("Account Created Successfully!", "success");
      window.location.href = "signIn.html";
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        showMessage("Email Address Already Exists!", "error");
      } else {
        showMessage("Unable to create user: " + error.message, "error");
      }
      console.error("Error:", error);
    }
  });
}


const signIn = document.getElementById("signInBtn");
console.log("signInBtn found?", signIn);
if (signIn) {
  signIn.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById("lEmail").value;
    const password = document.getElementById("lPassword").value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      showMessage('Login is successful', "success");
      localStorage.setItem('loggedInUserId', user.uid);
      window.location.href = 'menu.html';
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        showMessage("Incorrect Email or Password", "error");
      } else {
        showMessage("Account does not Exist.");
      }
      console.error("Error:", error);
    }
  });
}
