async function fetchQuestions(categoryId, difficulty, questionCount) {
    const progressController = showLoadingProgress();

    // CREATE THE URL TO USE FOR FRTHCING API
    const url = `https://opentdb.com/api.php?amount=${questionCount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
    
    try{
        const response = await fetch(url);
        const data = await response.json();
        
        if(data.response_code === 0){
            questions = data.results;
            sessionStorage.setItem('questions', JSON.stringify(questions));
            console.table(questions);

            // Complete the progress bar
            await progressController.complete();
            hideLoadingProgress();
            window.location.href = "game.html";
        }
        else if (data.response_code === 1) {
            await progressController.complete();
            hideLoadingProgress();
            alert("No questions available for this category/difficulty. Try again.");
        } 
        else {
            await progressController.complete();
            hideLoadingProgress();
            alert('Failed to fetch questions. Please try again.');
        }
    }
    catch(error){
        await progressController.complete();
        hideLoadingProgress();
        console.error(error);
        alert('Network error. Please check your connection.');
    }
}

document.addEventListener('DOMContentLoaded', difficultyButtons);
