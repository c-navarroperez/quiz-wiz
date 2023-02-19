const startBtn = document.querySelector("#start");
const questionDisplayDiv = document.querySelector("#questions");
const questionTitle = document.querySelector("#question-title");
const choicesDiv = document.querySelector("#choices");
const questionsArr = questions;

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
}

function loadQuestion() {
    //Take questions from questions.js and extract information to display it.
    currentQuestion = questionsArr[currentQuestionIndex];
    title = currentQuestion.title;
    choices = currentQuestion.choices;
    correctAnswer = currentQuestion.correctAnswer;

    questionTitle.innerText = title;

    console.log("*********************************************************************************");

    // Delete all answer choice buttons before adding new ones
    while(choicesDiv.hasChildNodes()){
        choicesDiv.removeChild(choicesDiv.children[0])
    }

    for (let i = 0; i < choices.length; i++){
        // Questions contain buttons for each answer.
        choicesDiv.insertAdjacentHTML(
            "beforeend",
            `<button class="answerBtn">${i+1}. ${choices[i]}</button>`
        );
    }

    questionDisplayDiv.setAttribute("class", "start");
}


//feedback
function checkAnswer(event) {
    
    let answerBtnArr = event.target.innerText.split(". ");
    let answer = answerBtnArr[1];
    console.log(correctAnswer);
    console.log(answer);
    // When correct answer is clicked,
    if (answer === correctAnswer) {
        // Give correct soundeffect feedback
        // display "Correct!" feedback for 1 second
        console.log("Correct!");
    } else {
        // When incorrect answer is clicked, 
        // Give wrong soundeffect feedback
        // display "Wrong!" feedback for 1 second
        console.log("Wrong!");
    }
 
//feedbackDisplay 
/*
    //     determine feedback element text (right/ wrong)
    //     display feedback 
    //         // .feedback

    // <div id="feedback" class="feedback hide"></div>

    //     // Include soundeffects?
    //             function playSound() {} 
*/
    
    console.log(choicesDiv);
    // Update question index
    currentQuestionIndex++;
    // then the next question appears
    loadQuestion();
}

// The quiz should end when all questions are answered correctly
/*
    <div id="end-screen" class="hide">
        <h2>All done!</h2>
        <p>Your final score is <span id="final-score"></span>.</p>
        <p>
            Enter initials: <input type="text" id="initials" max="3" />
            <button id="submit">Submit</button>
        </p>
    </div>
*/

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