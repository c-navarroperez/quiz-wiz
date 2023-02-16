const startBtn = document.querySelector("#start");



// A start button that when clicked the first question appears.
// Event listener on button #start
//when start button clicked

function startQuiz() {
    let startScreen = document.querySelector("#start-screen");
    // then hide #start-screen
    startScreen.setAttribute("class", "hide");
    // loadQuestion function()
    loadQuestions();
}

function loadQuestions() {
    let questionDisplayDiv = document.querySelector("#questions");
    // Take questions from questions.js and extract information to display it.
    // Questions contain buttons for each answer.
    // for(var questionObj of questions) {}
   

        // <div id="questions" class="hide">
        //     <h2 id="question-title"></h2>
        //     <div id="choices" class="choices"></div>
        // </div>
    

        // .choices button
        // ol
        // li

    questionDisplayDiv.setAttribute("class", "start");
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
    startBtn.addEventListener("click", startQuiz);
}

init();