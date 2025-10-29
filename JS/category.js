function handleCategoryChoice(){
    const categoryChoice = document.querySelectorAll('.categoryChoice');

    categoryChoice.forEach(choice => {
        choice.addEventListener('click', () => {
            const categoryId = choice.dataset.id;
            console.log(`Category Id: ${categoryId}`);
            sessionStorage.setItem('selectedCategory', categoryId);   
            window.location.href = "difficultyLevel.html";
        })
    })
}

document.addEventListener('DOMContentLoaded', handleCategoryChoice);