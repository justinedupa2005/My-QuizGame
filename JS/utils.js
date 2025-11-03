async function fetchQuestions(categoryId, difficulty, questionCount) {
    const progressController = showLoadingProgress();

    // CREATE THE URL TO USE FOR FETCHING API
    const url = `https://opentdb.com/api.php?amount=${questionCount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
    
    try{
        const response = await fetch(url);
        
        // Check if response is ok before parsing
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Response is not JSON");
        }
        
        const data = await response.json();
        
        if(data.response_code === 0){
            questions = data.results;
            sessionStorage.setItem('questions', JSON.stringify(questions));
            console.table(questions);

            // Complete the progress bar
            await progressController.complete();
            hideLoadingProgress();
            window.location.href = "game.html";
            return;
        }
        else if (data.response_code === 1) {
            await progressController.complete();
            console.warn("OpenTDB empty — trying backup API...");
            await tryBackupAPI(categoryId, difficulty, questionCount);
            hideLoadingProgress();
        } 
        else {
            await progressController.complete();
            hideLoadingProgress();
            alert('No available questions right now. Please try again later');
        }
    }
    catch(error){
        console.error('Fetch error:', error);
        await progressController.complete();
        console.warn("Primary API failed — trying backup API...");
        try {
            await tryBackupAPI(categoryId, difficulty, questionCount);
        } catch (backupError) {
            console.error('Backup API also failed:', backupError);
            alert('Network error. Please check your Internet connection.');
        }
        hideLoadingProgress();
    }
}

// 🔄 Fallback: try another trivia API
async function tryBackupAPI(categoryId, difficulty, questionCount) {
    const categoryMap = {
        17: "science",       // Science & Nature
        18: "computers",     // Science: Computers
        19: "mathematics",   // Science: Mathematics
        21: "sports",
        22: "geography",
        23: "history",
        25: "art",
        26: "celebrity",
        27: "animals",
        28: "vehicles",
    }

    const mappedCategory = categoryMap[categoryId] || "general";

    const backupUrl = `https://the-trivia-api.com/api/questions?categories=${mappedCategory}&limit=${questionCount}&difficulty=${difficulty}`;

    try {
        const response = await fetch(backupUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Response is not JSON");
        }
        
        const data = await response.json();

        if (data && data.length > 0) {
            // Convert data format if needed to match your game
            const formatted = data.map(q => ({
                question: q.question,
                correct_answer: q.correctAnswer,
                incorrect_answers: q.incorrectAnswers
            }));

            sessionStorage.setItem('questions', JSON.stringify(formatted));
            console.table(formatted);

            window.location.href = "game.html";
        } else {
            throw new Error('No questions returned from backup API');
        }
    } catch (error) {
        console.error('Backup API error:', error);
        alert('No available questions right now. Please try again later');
        throw error; // Re-throw so main function knows it failed
    }
}

document.addEventListener('DOMContentLoaded', difficultyButtons);