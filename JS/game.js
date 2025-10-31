const questionContainer = document.getElementById('gameQuestion');
const firstButton = document.getElementById('firstButton');
const secondButton = document.getElementById('secondButton');
const thirdButton = document.getElementById('thirdButton');
const fourthButton = document.getElementById('fourtButton');

const questions = JSON.parse(sessionStorage.getItem('questions')) || [];
let currentIndex = 0;

function startGame(){
    if(currentIndex < questions.length){
        const q = questions[currentIndex];

        questionContainer.innerHTML = q.question;

        const allAnswers = [...q.incorrect_answers.map(answer => ({text: answer, isCorrect: false})),
                            {text: q.correct_answer, isCorrect: true}
        ];

        const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
        const buttons = [firstButton, secondButton, thirdButton, fourthButton];

        shuffledAnswers.forEach((answer, i) => {
            buttons[i].textContent = answer.text;
            buttons[i].onclick = () => {
                if(answer.isCorrect){
                    console.log("Correct");
                }
                else{
                    console.log("Wrong");
                }
                
                setTimeout(nextQuestion, 1000);
            }
        });
    }
    else {
        questionContainer.textContent = "Quiz complete!";
    }
}

function nextQuestion(){
    currentIndex++;
    startGame();
}

document.addEventListener('DOMContentLoaded', startGame);