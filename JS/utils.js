async function fetchQuestions(categoryId, difficulty, questionCount) {

    const url = `https://opentdb.com/api.php?amount=${questionCount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
    
    try{
        const response = await fetch(url);
        const data = await response.json();

        if(data.response_code === 0){
            questions = data.results;
            sessionStorage.setItem('questions', JSON.stringify(questions));
            console.table(questions);
            window.location.href = "game.html";
        }
        else if (data.response_code === 1) {
            alert("No questions available for this category/difficulty. Try again.");
        } 
        else {
            alert('Failed to fetch questions. Please try again.');
        }
    }
    catch(error){
        console.error(error);
        alert('Network error. Please check your connection.');
    }
}