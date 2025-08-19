const username = document.getElementById('username');
const submitScoreBtn = document.getElementById('submitScoreBtn');
const finalScore = document.getElementById('quizScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecenztScore;

username.addEventListener('keyup', () => {
    submitScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();
};