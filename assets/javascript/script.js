
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
    startBtn.addEventListener('click', function () {
        if (categorySelect) {
            const cat = categorySelect.value;
            localStorage.setItem('selectedCategory', cat);
        }
        if (difficultySelect) {
            const diff = difficultySelect.value;
            localStorage.setItem('selectedDifficulty', diff);
        }
    });
}


const progressText = document.getElementById("progressText");
const scoreCount = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

// logo image element
const img = document.createElement('img');
// sets image source
img.src = '../assets/images/qh-logo.png';
img.alt = 'Quiz Hawks Logo';
// link to container
document.getElementById('logo-container').appendChild(img);


// Quiz Question Elements
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const categoryDisplay = document.getElementById("categoryDisplay");

let currentQuestion = {};
let acceptingAnswers = false;
let questionCounter = 0;
let availableQuestions = [];
let score = 0;


let questions = [];


document.addEventListener("DOMContentLoaded", () => {
    // --- LANDING PAGE DROPDOWNS ---
    const categorySelect = document.getElementById('categorySelect');
    const difficultySelect = document.getElementById('difficultySelect');
    if (categorySelect) {
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
    const startBtn = document.querySelector('a.btn[href="quiz.html"]');
    if (startBtn) {
        startBtn.addEventListener('click', function () {
            if (categorySelect) {
                const cat = categorySelect.value;
                localStorage.setItem('selectedCategory', cat);
            }
            if (difficultySelect) {
                const diff = difficultySelect.value;
                localStorage.setItem('selectedDifficulty', diff);
            }
        });
    }

    // --- QUIZ GAME CONSTANTS & STATE ---
    const CORRECT_BONUS = 10;
    const MAX_QUESTIONS = 5;
    let currentQuestion = {};
    let acceptingAnswers = false;
    let questionCounter = 0;
    let availableQuestions = [];
    let score = 0;
    let questions = [];

    // Heads Up Display Elements
    const questionCounterCount = document.getElementById("questionCounter");
    const scoreCount = document.getElementById("score");
    questionCounterCount.innerText = `${questionCounter} / ${MAX_QUESTIONS}`;

    // Quiz Question Elements
    const question = document.getElementById("question");
    const choices = Array.from(document.getElementsByClassName("choice-text"));
    const categoryDisplay = document.getElementById("categoryDisplay");

    // Utility to decode HTML entities
    function decodeHTMLEntities(text) {
        const txt = document.createElement('textarea');
        txt.innerHTML = text;
        return txt.value;
    }

    // --- LOAD QUESTIONS FROM API OR LOCAL FILE ---
    function loadQuestions(callback) {
        const selectedCategory = localStorage.getItem('selectedCategory');
        const selectedDifficulty = localStorage.getItem('selectedDifficulty');
        let apiUrl = "https://opentdb.com/api.php?amount=10&type=multiple";
        if (selectedCategory) {
            apiUrl += `&category=${selectedCategory}`;
        }
        if (selectedDifficulty) {
            apiUrl += `&difficulty=${selectedDifficulty}`;
        }
        fetch(apiUrl)
            .then((res) => res.json())
            .then(loadedQuestions => {
                questions = loadedQuestions.results.map(loadedQuestion => {
                    const formattedQuestion = {
                        question: decodeHTMLEntities(loadedQuestion.question),
                        category: decodeHTMLEntities(loadedQuestion.category)
                    };
                    const answerChoices = [...loadedQuestion.incorrect_answers];
                    formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
                    answerChoices.splice(
                        formattedQuestion.answer - 1,
                        0,
                        loadedQuestion.correct_answer
                    );
                    answerChoices.forEach((choice, index) => {
                        formattedQuestion["choice" + (index + 1)] = decodeHTMLEntities(choice);
                    });
                    return formattedQuestion;
                });
                callback();
            })
            .catch(err => {
                fetch("assets/javascript/questions.json")
                    .then(res => res.json())
                    .then(localQuestions => {
                        questions = localQuestions.map(q => {
                            const formattedQuestion = {
                                question: decodeHTMLEntities(q.question),
                                answer: q.answer
                            };
                            for (let i = 1; i <= 4; i++) {
                                formattedQuestion["choice" + i] = decodeHTMLEntities(q["choice" + i]);
                            }
                            return formattedQuestion;
                        });
                        callback();
                    })
                    .catch(localErr => {
                        console.error("Failed to load questions from both API and local file.", localErr);
                    });
            });
    }

    // --- START GAME: Initializes state and begins quiz ---
    function startGame() {
        questionCounter = 0;
        score = 0;
        availableQuestions = [...questions];
        getNewQuestion();
    }

    // Load questions and start the game
    loadQuestions(startGame);

    // --- GET NEW QUESTION: Loads next question and updates UI ---
    function getNewQuestion() {
        if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
            localStorage.setItem("mostRecentScore", score);
            return window.location.assign("results.html");
        }
        questionCounter++;
        questionCounterCount.innerText = `${questionCounter} / ${MAX_QUESTIONS}`;
        const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        question.innerText = decodeHTMLEntities(currentQuestion.question);
        if (currentQuestion.category) {
            categoryDisplay.innerText = decodeHTMLEntities(currentQuestion.category);
        } else {
            categoryDisplay.innerText = "";
        }
        choices.forEach(choice => {
            const number = choice.dataset["number"];
            choice.innerText = decodeHTMLEntities(currentQuestion["choice" + number]);
        });
        availableQuestions.splice(questionIndex, 1);
        acceptingAnswers = true;
    }

    // --- ANSWER CHOICE CLICK HANDLING ---
    choices.forEach(choice => {
        choice.addEventListener("click", e => {
            if (!acceptingAnswers) return;
            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset["number"];
            const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
            if (classToApply === "correct") {
                incrementScore(CORRECT_BONUS);
            }
            selectedChoice.parentElement.classList.add(classToApply);
            choices.forEach(choice => {
                if (choice.dataset["number"] == currentQuestion.answer) {
                    choice.parentElement.classList.add("correct");
                }
            });
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                choices.forEach(choice => {
                    choice.parentElement.classList.remove("correct");
                });
                getNewQuestion();
            }, 2000)
        });
    });

    // --- INCREMENT SCORE ---
    function incrementScore(Number) {
        score += Number;
        scoreCount.innerText = score;
    }
});

