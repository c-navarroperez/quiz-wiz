/* DOM element references */
const highscoresDisplay = document.querySelector('#highscores');
const clearListBtn = document.querySelector('#clear');

//orderScores function. Takes in scores and orders correctly
function orderScores(storedScores) {
    // For each element of the storedScores array
    storedScores.forEach((userScore) => {
        // cast the string form number to a Number
        userScore.score = Number(userScore.score);
    });
    // Sort the elements within the array in descending order
    storedScores.sort((a, b) => {
        // if a < b, sort a after b (-1) 
        // else if a > b, sort a before b (1)
        // else a === b, keep original order of a and b (===0)
        return a.score < b.score ? 1 : a.score > b.score ? -1 : 0;
    });
  }

// Display Highscores scoreboard stored in local storage
function displayHighscores() {
    if (localStorage.getItem('scoreBoard') === null) {
        highscoresDisplay.innerText = 'No Scores Available';
        return;
    }
    // Get scores array from local storage
    let storedScores = JSON.parse(localStorage.getItem('scoreBoard'));
    // Sort scores in descending order
    orderScores(storedScores);
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