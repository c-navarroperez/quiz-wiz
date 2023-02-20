/* DOM element references */
const highscoresDisplay = document.querySelector('#highscores');
const clearListBtn = document.querySelector('#clear');

// Display Highscores scoreboard stored in local storage
function displayHighscores() {
    if (localStorage.getItem('scoreBoard') === null) {
        highscoresDisplay.innerText = 'No Scores Available';
        return;
    }
    // Get scores array from local storage
    let storedScores = JSON.parse(localStorage.getItem('scoreBoard'));
    console.log(storedScores);

    // Insert Highscores recursively
    for (let userScore of storedScores) {
        highscoresDisplay.insertAdjacentHTML(
            'beforeend',
            `<li class="score">${userScore.initials} - ${userScore.score}</li>`
        );
    }
}

// Event Listener for the Clear Highscores button
clearListBtn.addEventListener('click', () => {
    // Remove scoreboard from local storage
    localStorage.removeItem('scoreBoard');
    // Update the Highscores displayed to empty
    highscoresDisplay.innerHTML = '';
});

function init() {
    displayHighscores();
}

// initialise Highscores display
init();