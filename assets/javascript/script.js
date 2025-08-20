
const progressText = document.getElementById("progressText");
const scoreCount = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

// logo image element
const img = document.createElement('img');
// sets image source
img.src = '../assets/images/qh-logo.png' ;
img.alt = 'Quiz Hawks Logo';
// link to container
document.getElementById('logo-container').appendChild(img);


// Quiz Question Elements
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));


let currentQuestion = {};
let acceptingAnswers = false;
let questionCounter = 0;
let availableQuestions = [];
let score = 0;


let questions = [];


// Utility to decode HTML entities
    function decodeHTMLEntities(text) {
        // Converts HTML entities to readable text (e.g., &quot; -> ")
        const txt = document.createElement('textarea');
        txt.innerHTML = text;
        return txt.value;
    }

fetch("https://opentdb.com/api.php?amount=10&type=multiple")
.then((res) => {
    return res.json();
})
.then(loadedQuestions => {
    questions = loadedQuestions.results.map(loadedQuestion => {
        const formattedQuestion = {
             question: decodeHTMLEntities(loadedQuestion.question),   
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

    startGame();

})
.catch(err => {
    console.error(err);
});
//constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
   
    getNewQuestion();
};


getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
            localStorage.setItem("mostRecentScore", score);
        //go to the results page
        return window.location.assign("results.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} / ${MAX_QUESTIONS}`;
// Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = decodeHTMLEntities(currentQuestion.question);

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = decodeHTMLEntities(currentQuestion["choice" + number]);
    });
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        // check if the correct answer was selected
        const isCorrect = selectedAnswer == currentQuestion.answer;
        const classToApply = isCorrect ? "correct" : "incorrect";
        selectedChoice.parentElement.classList.add(classToApply);

        // Increment score and update display if correct
        if (isCorrect) {
            score += CORRECT_BONUS;
            scoreCount.innerText = score;
        }

        // Always show the correct answer
        choices.forEach(choice => {
            if (choice.dataset["number"] == currentQuestion.answer) {
                choice.parentElement.classList.add("correct");
            }
        });

        // Set timeout to remove classes and get new question
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            // Remove 'correct' class from all choices
            choices.forEach(choice => {
                choice.parentElement.classList.remove("correct");
            });
            getNewQuestion();
        }, 2000)
        
    });
});

