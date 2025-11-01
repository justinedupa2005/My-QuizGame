const questionContainer = document.getElementById('gameQuestion');
const timerContainer = document.getElementById('timerContainer');
const choicesContainer = document.getElementById('choicesContainer');
const numOfQuestionContainer = document.getElementById('numOfQuestionContainer');

let questions = JSON.parse(sessionStorage.getItem('questions')) || [];

questions = questions.filter(q => {
    const choices = [...q.incorrect_answers, q.correct_answer];
    return choices.every(choice => choice.length <= 15);
});

let currentIndex = 0;
let countdownInterval; // for stopping timer later
let timeLeft = 10; // 10 seconds per question
let easyLevelNumOfQuestions = 10;
let mediumLevelNumOfQuestions = 15;
let hardLevelNumOfQuestions = 10;

function startGame(){
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
            }, 1500); // show overlay for 1.5 seconds
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
        shuffledAnswers.forEach((answer, i) => {
            const btn = document.createElement('button');
            btn.className = 'choice-button';
            btn.textContent = answer.text;
            btn.onclick = () => {
                const allButtons = choicesContainer.querySelectorAll('button');
                allButtons.forEach(button => button.disabled = true);

                if(answer.isCorrect){
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
        questionContainer.textContent = "Quiz complete!";
        choicesContainer.innerHTML = '';
    }
}

function nextQuestion(){
    currentIndex++;
    startGame();
}

document.addEventListener('DOMContentLoaded', startGame);