const categorySelect = document.getElementById('categorySelect');
// Populate difficulty dropdown if present
const difficultySelect = document.getElementById('difficultySelect');
if (categorySelect) {
    // Fetch categories from Open Trivia DB API and populate dropdown
    fetch('https://opentdb.com/api_category.php')
        .then(res => res.json())
        .then(data => {
            data.trivia_categories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.id;
                option.textContent = cat.name;
                categorySelect.appendChild(option);
            });
        });
}
// Attach Start Quiz logic to button
const startBtn = document.querySelector('a.btn[href="quiz.html"]');
if (startBtn) {
    // When Start Quiz is clicked, save selected category and difficulty to localStorage
    const maxQuestionsSelect = document.getElementById('maxQuestionsSelect');
    startBtn.addEventListener('click', function () {
        if (categorySelect) {
            const cat = categorySelect.value;
            localStorage.setItem('selectedCategory', cat);
        }
        if (difficultySelect) {
            const diff = difficultySelect.value;
            localStorage.setItem('selectedDifficulty', diff);
        }
        if (maxQuestionsSelect) {
            const maxQ = maxQuestionsSelect.value;
            localStorage.setItem('maxQuestions', maxQ);
        }
    });
}
