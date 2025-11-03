const questionContainer = document.getElementById('gameQuestion');
const timerContainer = document.getElementById('timerContainer');
const choicesContainer = document.getElementById('choicesContainer');
const numOfQuestionContainer = document.getElementById('numOfQuestionContainer');

let questions = JSON.parse(sessionStorage.getItem('questions')) || [];

// GET QUESTIONS FROM API AND CHECKING THE LENGTH OF EVERY ANSWERS
// questions = questions.filter(q => {
//     const choices = [...q.incorrect_answers, q.correct_answer];
//     return choices.every(choice => choice.length <= 15);
// });

let currentIndex = 0;
let countdownInterval; // for stopping timer later
let timeLeft = 10; // 10 seconds per question
let easyLevelNumOfQuestions = 20;
let mediumLevelNumOfQuestions = 15;
let hardLevelNumOfQuestions = 10;
let score = 0;

function startGame(){
    if(currentIndex === 0){
        score = 0;
    }
    if(currentIndex < questions.length){
        const q = questions[currentIndex];
        questionContainer.innerHTML = q.question;

        // STORE ANSWERS FROM THE API
        const allAnswers = [...q.incorrect_answers.map(answer => ({text: answer, isCorrect: false})),
                            {text: q.correct_answer, isCorrect: true}
        ];

        const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

        // DISPLAY TIMER
        let timer = document.getElementById('timer');
        if(!timer){
            timer = document.createElement('p');
            timer.id = 'timer';
            timerContainer.appendChild(timer);
        }

        // TIMER'S UP POP UP
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

        // OVERLAY FOR THE TIMER POP UP
        function showOverlay(message) {
            const overlay = document.getElementById('overlay');
            const messageBox = overlay.querySelector('.overlay-message');
            messageBox.textContent = message;

            overlay.classList.remove('hidden');

            setTimeout(() => {
                overlay.classList.add('hidden');
                nextQuestion();
            }, 1500); // show overlay for 1.5 seconds
        }

        // DISPLAY QUESTIONS
        let numberOfQuestions = document.getElementById('numberOfQuestions');
        if(!numberOfQuestions){
            numberOfQuestions = document.createElement('p');
            numberOfQuestions.id = 'numberOfQuestions';
            numOfQuestionContainer.appendChild(numberOfQuestions);
        }  

        // CHECK THE DIFFICULTY LEVEL
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

        // CREATE BUTTONS AND CHANGE VALUES DEPENDING OF THE QUESTION
        choicesContainer.innerHTML = '';
        shuffledAnswers.forEach((answer) => {
            const btn = document.createElement('button');

            const len = answer.text.length;
            btn.className = 'choice-button';

            // Adjust button height based on length
            if (len <= 15) btn.style.height = '4rem';
            else if (len <= 30) btn.style.height = '6rem';
            else if (len <= 50) btn.style.height = '8rem';
            else if (len <= 80) btn.style.height = '10rem';
            else btn.style.height = '12rem';

            // 🔹 Adjust font size dynamically
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
        window.location.href = 'quizResult.html';
    }
}

// FUNCTION FOR NEXT QUESTION
function nextQuestion(){
    currentIndex++;
    startGame();
}

document.addEventListener('DOMContentLoaded', startGame);