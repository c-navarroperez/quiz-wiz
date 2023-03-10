/* DOM element references */
const startScreen = document.querySelector('#start-screen');
const startBtn = document.querySelector('#start');
const questionDisplayDiv = document.querySelector('#questions');
const questionTitle = document.querySelector('#question-title');
const choicesDiv = document.querySelector('#choices');
const feedbackDiv = document.querySelector('#feedback');
const endScreen = document.querySelector('#end-screen');
const countdownTimer = document.querySelector('#time');
const displayFinalScore = document.querySelector('#final-score');
const userInitials = document.querySelector('#initials');
const submitBtn = document.querySelector('#submit');
const correctSound = new Audio('./assets/sfx/correct.wav');
const incorrectSound = new Audio('./assets/sfx/incorrect.wav');

/* Global Variables */
let currentQuestionIndex = 0;
let correctAnswer = '';
let timeLeft = 100; // Set Quiz timer to 100s
let timerInterval;


/* Functions block */

// Function to start quiz
function startQuiz() {
    // then hide the start-screen
    startScreen.setAttribute('class', 'hide');
    // loadQuestion function()
    loadQuestion();
    countdown();
}

// Function to update a countdown
function countdown() {
    // Display initial time left
    countdownTimer.innerText = timeLeft;
    //Use setInterval() method to decrease the timer every 1000 milliseconds
    timerInterval = setInterval(() => {
        // Decrease timer by one
        timeLeft--;
        // Display current time left
        countdownTimer.innerText = timeLeft;
        // If time spent, end game and interval
        if (timeLeft <= 0) {
            timeLeft = 0;
            loadEndScreen(timeLeft);
        }
    }, 1000);
}  

// Function to load questions
function loadQuestion() {
    //Take questions from questions.js and extract information to display it.
    let currentQuestion = questionsList[currentQuestionIndex];
    let title = currentQuestion.title;
    let choices = currentQuestion.choices;
    correctAnswer = currentQuestion.correctAnswer;

    // Set question title
    questionTitle.innerText = title;
    
    // Delete all answer choice buttons before adding new ones
    choicesDiv.innerHTML = '';

    // Insert HTML buttons for every answer choice
    for (let i = 0; i < choices.length; i++){
        // Questions contain buttons for each answer.
        choicesDiv.insertAdjacentHTML(
            'beforeend',
            `<button class='answerBtn'>${i+1}. ${choices[i]}</button>`
        );
    }
    questionDisplayDiv.classList.remove('hide');
}

// Function to check user answer against the solution and provide feedback
function checkAnswer(event) {
    let answerBtnArr = event.target.innerText.split('. ');
    let answer = answerBtnArr[1];

    // When correct answer is clicked,
    if (answer === correctAnswer) {
        // Play 'correct' soundeffect
        correctSound.play();
        // display 'Correct!'
        displayFeedback('Correct!');
    } else {
        // Play 'incorrect' soundeffect 
        incorrectSound.play();
        // display 'Wrong!'
        displayFeedback('Wrong!');
        // Deduct 10 seconds from the timer
        timeLeft -= 10;
    }

    // The quiz should end when all questions are answered correctly
    if (currentQuestionIndex < questionsList.length - 1) {
        // Update question index
        currentQuestionIndex++;
        // then the next question appears
        loadQuestion();
    } else {
        // Reccord remaining time as the final score
        let finalScore = timeLeft;
        setTimeout(()=> {   
            loadEndScreen(finalScore);
        }, 750);
    }
}

// Display Feedback
function displayFeedback(feedbackText){
    feedbackDiv.innerText = feedbackText;
    // Display feedback section
    feedbackDiv.classList.remove('hide');
    //Remove feedback section after 750 millsiseconds
    setTimeout(()=> {   
        feedbackDiv.setAttribute('class', 'feedback hide');
    }, 750);
}

// Load end screen with score
function loadEndScreen (finalScore) {
    questionDisplayDiv.setAttribute('class', 'hide');
    clearInterval(timerInterval);
    countdownTimer.innerText = '0';
    displayFinalScore.innerText = finalScore;
    endScreen.classList.remove('hide');
}

// Function to update local storage with new score
function updateLocalStorage (initials) {
    // retreive final score
    let newUserScore = displayFinalScore.innerText;
    // create user object to store initials and score
    let userDataObj = { initials: initials, score: newUserScore };

    // Check for existing scoreboard 
    if (localStorage.getItem('scoreBoard') !== null) {
        let scoreBoard = JSON.parse(localStorage.getItem('scoreBoard'));
        // Update scoreboard
        scoreBoard.push(userDataObj);
        localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard));
    } else {
        // store user data in local storage
        let userArr = [userDataObj];
        localStorage.setItem('scoreBoard', JSON.stringify(userArr));
    }
}


/* Event listeners */

// Event listener for the answer choices
choicesDiv.addEventListener('click', (event) => {
    // If a button has been pressed
    if (event.target.className === 'answerBtn'){ 
        checkAnswer(event)
    }
});

// Event listener for the submit score button
submitBtn.addEventListener('click', () => {
    let initials = userInitials.value;
    if (initials.length > 3) {
        userInitials.value = '';
        alert('Please enter maximum 3 characters');
        return;
    } else {
        updateLocalStorage(initials);
        // Open highscores page
        location.href = '././highscores.html';
    }
});
        

/* App Initialisation */

function init() {
    // A start button that when clicked the first question appears.
    startBtn.onclick = () => startQuiz();
}

// Initialise App
init();