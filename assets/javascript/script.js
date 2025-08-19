
const questionCounterCount = document.getElementById("questionCounter");
const scoreCount = document.getElementById("score");

// Quiz Question Elements
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));


let currentQuestion = {};
let acceptingAnswers = false;
let questionCounter = 0;
let availableQuestions = [];



let questions = [];

// Utility to decode HTML entities
function decodeHTMLEntities(text) {
    const txt = document.createElement('textarea');
    txt.innerHTML = text;
    return txt.value;
}


// Load questions from API or local file
function loadQuestions(callback) {
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
        .then((res) => res.json())
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
            callback();
        })
        .catch(err => {
            // If API fails, load from local questions.json
            fetch("assets/javascript/questions.json")
                .then(res => res.json())
                .then(localQuestions => {
                    questions = localQuestions.map(q => {
                        const formattedQuestion = {
                            question: decodeHTMLEntities(q.question),
                            answer: q.answer
                        };
                        // Decode all choices
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
//constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

// Load questions and start the game
loadQuestions(startGame);


getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the results page
        return window.location.assign("results.html");
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    // Always decode before display (extra safety)
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

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000)
        
    });
});

