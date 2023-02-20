/* DOM element references */
const scoreList = document.querySelector('#highscores');
const clearListBtn = document.querySelector('#clear');

// Display Highscores function ()

// Event Listener for the Clear Highscores button
clearListBtn.addEventListener('click', () => {
    // Remove scoreboard from local storage
    localStorage.removeItem('scoreBoard');
    // Update the Highscores displayed to empty
});

function init (){
    //Display scoreboard stored in local storage
}

// initialise Highscores display
init();