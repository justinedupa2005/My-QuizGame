function showLoadingProgress() {
    const overlay = document.getElementById('loadingOverlay');
    const progressCircle = document.getElementById('progressCircle');
    const progressText = document.getElementById('progressText');
        
    overlay.classList.add('active');
        
    let progress = 0;
    const interval = 50; // Update every 50ms
    let progressInterval;
        
    const updateProgress = (targetProgress) => {
        if (progress < targetProgress) {
            progress = Math.min(progress + 2, targetProgress);
            const offset = 440 - (440 * progress) / 100;
            progressCircle.style.strokeDashoffset = offset;
            progressText.textContent = Math.round(progress) + '%';
        }
    };
        
    progressInterval = setInterval(() => {
        updateProgress(90); // Progress naturally to 90%
    }, interval);
        
    return {
        complete: () => {
        clearInterval(progressInterval);
            
        return new Promise(resolve => {
            // Complete the remaining 10% quickly
            const finalInterval = setInterval(() => {
            progress += 5;
            if (progress >= 100) {
                progress = 100;
                clearInterval(finalInterval);
                  
                const offset = 440 - (440 * progress) / 100;
                progressCircle.style.strokeDashoffset = offset;
                progressText.textContent = Math.round(progress) + '%';
                  
                // Wait a bit to show 100% before resolving
                setTimeout(resolve, 500);
                return;
            }
            const offset = 440 - (440 * progress) / 100;
            progressCircle.style.strokeDashoffset = offset;
            progressText.textContent = Math.round(progress) + '%';
            }, 30);
        });
        }
    };
}

function hideLoadingProgress() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.remove('active');
}



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
                console.log("Medium");
            }
            else {
                questionCount = hardLevel;
                console.log("Hard");
            }

            sessionStorage.setItem('questionCount', questionCount);

            const categoryId = sessionStorage.getItem('selectedCategory');
            fetchQuestions(categoryId, level, questionCount);
        })
    })
}



