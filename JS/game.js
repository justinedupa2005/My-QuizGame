// ADD THESE IMPORTS AT THE TOP
import { AddUserInLeaderboard } from './firebaseAuth.js';
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAhmm7k8VLAfSWi-RazHM7oHfBG5BCEN2s",
    authDomain: "quizgame-login-form.firebaseapp.com",
    projectId: "quizgame-login-form",
    storageBucket: "quizgame-login-form.firebasestorage.app",
    messagingSenderId: "738834776023",
    appId: "1:738834776023:web:c4581e984670a315e09592"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// REST OF YOUR CODE BELOW
const questionContainer = document.getElementById('gameQuestion');
const timerContainer = document.getElementById('timerContainer');
const choicesContainer = document.getElementById('choicesContainer');
const numOfQuestionContainer = document.getElementById('numOfQuestionContainer');

let questions = JSON.parse(sessionStorage.getItem('questions')) || [];

let currentIndex = 0;
let countdownInterval;
let timeLeft = 10;
let easyLevelNumOfQuestions = 20;
let mediumLevelNumOfQuestions = 15;
let hardLevelNumOfQuestions = 10;
let score = 0;

async function startGame(){
    if(currentIndex === 0){
        score = 0;
    }
    if(currentIndex < questions.length){
        const q = questions[currentIndex];
        questionContainer.innerHTML = q.question;

        const allAnswers = [...q.incorrect_answers.map(answer => ({text: answer, isCorrect: false})),
                            {text: q.correct_answer, isCorrect: true}
        ];

        const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

        let timer = document.getElementById('timer');
        if(!timer){
            timer = document.createElement('p');
            timer.id = 'timer';
            timerContainer.appendChild(timer);
        }

        clearInterval(countdownInterval);
        timeLeft = 10;
        timer.textContent = `${timeLeft}`;

        countdownInterval = setInterval(() => {
            timeLeft--;
            timer.textContent = `${timeLeft}`;

            if(timeLeft <= 0){
                clearInterval(countdownInterval);
                showOverlay("Time's Up!");
            } 
        }, 1000);

        function showOverlay(message) {
            const overlay = document.getElementById('overlay');
            const messageBox = overlay.querySelector('.overlay-message');
            messageBox.textContent = message;

            overlay.classList.remove('hidden');

            setTimeout(() => {
                overlay.classList.add('hidden');
                nextQuestion();
            }, 1500);
        }

        let numberOfQuestions = document.getElementById('numberOfQuestions');
        if(!numberOfQuestions){
            numberOfQuestions = document.createElement('p');
            numberOfQuestions.id = 'numberOfQuestions';
            numOfQuestionContainer.appendChild(numberOfQuestions);
        }  

        const level = sessionStorage.getItem('selectedDifficulty');
        if(level === 'easy'){
            numberOfQuestions.textContent = `${currentIndex + 1} / ${easyLevelNumOfQuestions}`;
        }
        else if(level === 'medium'){
            numberOfQuestions.textContent = `${currentIndex + 1} / ${mediumLevelNumOfQuestions}`;
        }
        else if(level === 'hard'){
            numberOfQuestions.textContent = `${currentIndex + 1} / ${hardLevelNumOfQuestions}`;
        }

        choicesContainer.innerHTML = '';
        shuffledAnswers.forEach((answer) => {
            const btn = document.createElement('button');

            const len = answer.text.length;
            btn.className = 'choice-button';

            if (len <= 15) btn.style.height = '4rem';
            else if (len <= 30) btn.style.height = '6rem';
            else if (len <= 50) btn.style.height = '8rem';
            else if (len <= 80) btn.style.height = '10rem';
            else btn.style.height = '12rem';

            if (len <= 15) btn.style.fontSize = '1.4rem';
            else if (len <= 30) btn.style.fontSize = '1.2rem';
            else if (len <= 50) btn.style.fontSize = '1rem';
            else if (len <= 80) btn.style.fontSize = '0.9rem';
            else btn.style.fontSize = '0.8rem';

            btn.textContent = answer.text;
            btn.onclick = () => {
                clearInterval(countdownInterval);
                const allButtons = choicesContainer.querySelectorAll('button');
                allButtons.forEach(button => button.disabled = true);

                if(answer.isCorrect){
                    const choosenLevel = sessionStorage.getItem('selectedDifficulty');
                    if(choosenLevel === "easy") score += 10;
                    else if(choosenLevel === "medium") score += 15;
                    else if(choosenLevel === "hard") score += 20
                    console.log("Correct");
                }
                else{
                    console.log("Wrong");
                }
                
                setTimeout(nextQuestion, 1000);
            }
            choicesContainer.appendChild(btn);
        });
    }
    else {
        sessionStorage.setItem('finalScore', score);
        
        // Save score to leaderboard
        await saveScoreToLeaderboard(score);
        
        window.location.href = 'quizResult.html';
    }
}

function nextQuestion(){
    currentIndex++;
    startGame();
}

async function saveScoreToLeaderboard(finalScore) {
    try {
        const userId = localStorage.getItem('loggedInUserId');
        
        if (!userId) {
            console.error("No user logged in");
            return;
        }

        const userDoc = await getDoc(doc(db, "users", userId));
        
        if (userDoc.exists()) {
            const username = userDoc.data().username;
            await AddUserInLeaderboard(username, finalScore);
            console.log("Score saved to leaderboard!");
        }
    } catch (error) {
        console.error("Error saving to leaderboard:", error);
    }
}

document.addEventListener('DOMContentLoaded', startGame);