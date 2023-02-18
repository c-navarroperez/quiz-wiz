const startBtn = document.querySelector("#start");
const questionDisplayDiv = document.querySelector("#questions");
const questionTitle = document.querySelector("#question-title");
const choicesDiv = document.querySelector("#choices");
const questionsArr = questions;

let currentQuestionIndex = 0;

//when start button clicked
function startQuiz() {
    let startScreen = document.querySelector("#start-screen");
    // then hide #start-screen
    startScreen.setAttribute("class", "hide");
    // loadQuestion function()
    loadQuestion(currentQuestionIndex);
}

function loadQuestion(QuestionIndex) {
    //Take questions from questions.js and extract information to display it.
    console.log(currentQuestionIndex);
    let currentQuestion = questionsArr[QuestionIndex];
    let title = currentQuestion.title;
    let choices = currentQuestion.choices;
    let correctAnswer = currentQuestion.correctAnswer;

    questionTitle.innerText = title;

    for (let i = 0; i < choices.length; i++){
        // Questions contain buttons for each answer.
        choicesDiv.insertAdjacentHTML(
            "beforeend",
            `<button>${i+1}. ${choices[i]}</button>`
        );
    }

    questionDisplayDiv.setAttribute("class", "start");
    choicesDiv.addEventListener('click', checkAnswer(correctAnswer));
}


/*feedback
    //function checkAnswer() {
        // When incorrect answer is clicked, 
            display "Wrong!" feedback for 1 second

         // When correct answer is clicked,
            display "Correct!" feedback for 1 second
            then the next question appears

    }

 
    // function feedbackDisplay() 
        determine feedback element text (right/ wrong)
        display feedback 
           // .feedback

        // Include soundeffects?
             function playSound() {} 
*/

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

        
function init() {
    // A start button that when clicked the first question appears.
    // Event listener on button #start
    startBtn.addEventListener("click", startQuiz);
}

init();