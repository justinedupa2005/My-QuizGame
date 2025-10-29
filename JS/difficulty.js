function difficultyButtons(){
    const difficultyBtns = document.querySelectorAll('.difficulty-level-buttons');
    const easyLevel = 20;
    const mediumLevel = 15;
    const hardLevel = 10;

    difficultyBtns.forEach(button => {
        button.addEventListener('click', () => {
            const level = button.dataset.level;
            sessionStorage.setItem('selectedDifficulty', level);

            let questionCount;
            if(level === "easy"){
                questionCount = easyLevel;
                console.log("Easy");
            } 
            else if(level === "medium"){
                questionCount = mediumLevel;
                console.log("Easy");
            }
            else {
                questionCount = hardLevel;
                console.log("Easy");
            }

            sessionStorage.setItem('questionCount', questionCount);

            const categoryId = sessionStorage.getItem('selectedCategory');
            fetchQuestions(categoryId, level, questionCount);
        })
    })
}

document.addEventListener('DOMContentLoaded', difficultyButtons);
