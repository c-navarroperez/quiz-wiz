const startBtn = document.querySelector("#start");
const questionDisplayDiv = document.querySelector("#questions");
const questionTitle = document.querySelector("#question-title");
const choicesDiv = document.querySelector("#choices");
const feedbackDiv = document.querySelector("#feedback");
const endScreen = document.querySelector("#end-screen");
const countdownTimer = document.querySelector("#time")
const questionsArr = questions;
const correctSound = new Audio("./assets/sfx/correct.wav");
const incorrectSound = new Audio("./assets/sfx/incorrect.wav");

let currentQuestionIndex = 0;
let currentQuestion = questionsArr[currentQuestionIndex];
let title = currentQuestion.title;
let choices = currentQuestion.choices;
let correctAnswer = currentQuestion.correctAnswer;

//when start button clicked
function startQuiz() {
    let startScreen = document.querySelector("#start-screen");
    // then hide #start-screen
    startScreen.setAttribute("class", "hide");
    // loadQuestion function()
    loadQuestion();
    countdown();
}

function countdown() {
    // Set Quiz timer
    let timeLeft = 10;
    // Display initial time left
    countdownTimer.innerText = timeLeft;
    //Use setInterval() method to decrease the timer every 1000 milliseconds
    let timerInterval = setInterval(() => {
        // Decrease timer by one
        timeLeft--;
        // Display current time left
        countdownTimer.innerText = timeLeft;
        // If time spent, end game and interval
        if (timeLeft <= 0){
            countdownTimer.innerText = "0";
            clearInterval(timerInterval);
            loadEndScreen();
        }
    }, 1000);
}  

function loadQuestion() {
    //Take questions from questions.js and extract information to display it.
    currentQuestion = questionsArr[currentQuestionIndex];
    title = currentQuestion.title;
    choices = currentQuestion.choices;
    correctAnswer = currentQuestion.correctAnswer;

    // Set question title
    questionTitle.innerText = title;
    
    // Delete all answer choice buttons before adding new ones
    while(choicesDiv.hasChildNodes()){
        choicesDiv.removeChild(choicesDiv.children[0])
    }

    // Insert HTML buttons for every answer choice
    for (let i = 0; i < choices.length; i++){
        // Questions contain buttons for each answer.
        choicesDiv.insertAdjacentHTML(
            "beforeend",
            `<button class="answerBtn">${i+1}. ${choices[i]}</button>`
        );
    }

    questionDisplayDiv.classList.remove("hide");
}

// Function to check user answer against the solution and provide feedback
function checkAnswer(event) {
    let answerBtnArr = event.target.innerText.split(". ");
    let answer = answerBtnArr[1];

    // When correct answer is clicked,
    if (answer === correctAnswer) {
        // Play "correct" soundeffect feedback
        correctSound.play();
        // display "Correct!" feedback
        displayFeedback("Correct!");
    } else {
        // When incorrect answer is clicked, play "incorrect" soundeffect feedback
        incorrectSound.play();
        // display "Wrong!" feedback
        displayFeedback("Wrong!");
    }

    // The quiz should end when all questions are answered correctly
    if (currentQuestionIndex < questionsArr.length - 1) {
        // Update question index
        currentQuestionIndex++;
        // then the next question appears
        loadQuestion();
    } else {
        setTimeout(()=> {   
            loadEndScreen();
        }, 750);
    }
}

// Display Feedback
function displayFeedback(feedbackText){
    feedbackDiv.innerText = feedbackText;
    // Display feedback section
    feedbackDiv.classList.remove("hide");
    //Remove feedback section after 750 millsiseconds
    setTimeout(()=> {   
        feedbackDiv.setAttribute("class", "feedback hide");
    }, 750);
}

function loadEndScreen () {
    questionDisplayDiv.setAttribute("class", "hide");
    endScreen.classList.remove("hide");;
}

// Add event listener for the Choices <div>
choicesDiv.addEventListener('click', (event) => {
    // Only if a button has been pressed within parent div
    if (event.target.className === "answerBtn"){ 
        checkAnswer(event)
    }
});
        
function init() {
    // A start button that when clicked the first question appears.
    startBtn.onclick = () => startQuiz();
}

// Initialise App
init();