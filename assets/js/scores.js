/* DOM element references */
const scoreList = document.querySelector('#highscores');
const clearListBtn = document.querySelector('#clear');

// Display Highscores function ()

//Event Listener
clearListBtn.addEventListener('click', () => {
    localStorage.removeItem('scoreBoard');
    while(scoreList.hasChildNodes()){
        scoreList.removeChild(scoreList.children[0]);
    }
});

function init (){
    //Display scoreboard stored in local storage
}

//init scoreboard
init();