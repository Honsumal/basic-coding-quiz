let timerEl = document.querySelector(".timer");
let hSList = document.getElementById("highScoreList");
let iBox = document.getElementById("infoBox");
let qBox = document.getElementById("quizBox");
let rBox = document.getElementById("resultsBox");
let eMess = document.getElementById("endMessage");
let oList = document.getElementById('optionList');

let highScoreNum = 10;
let highScores = [];

let preTime = 3;
let gameTime = 50;
let pCounter;
let counter;

let qLeft = 10;
let qNumber = 1;
let qIndex = 0;
let skipLeft = 3;
let qWrong = 0;

//Initialize function, used for both startup and resetting the quiz
function init() {
    let storedHighScores = JSON.parse(localStorage.getItem("highScoreList"))

    if (storedHighScores !== null) {
        highScores = storedHighScores;
    }

    preTime = 3;
    gameTime = 50;

    qLeft = 10;
    qNumber = 1;
    qIndex = 0;
    skipLeft = 3;
    qWrong = 0;

    questions = structuredClone(questionRepo)

    document.getElementById('skipButton').setAttribute('style', 'display: none')
  }

//Question repository
let questionRepo = [
    {
        num: 1,
        q: "What is HTML?",
        a: "Hyper Text Markup Language",
        op: [
            "Hyperbolic Time Morphing Loghouse",
            "Hyper Text Markup Language",
            "Hyper Texual Marking Language",
            "Hyper Text Mark Language"
        ]
    },
    {
        num: 2,
        q: "What is CSS?",
        a: "Cascading Style Sheets",
        op: [
            "Cascading Style Sheets",
            "Cascade Styling Sheets",
            "Crownie's Shooting Star",
            "Computer Styling Sheets"
        ]
    },
    {
        num: 3,
        q: "Which of the following is a HTML tag?",
        a: "/td",
        op: [
            "/ti",
            "/tp",
            "/td",
            "/ta"
        ]
    },
    {
        num: 4,
        q: "Which of the following is NOT a valid DOM Traversal method?",
        a: "document.getElementsById()",
        op: [
            "document.querySelector()",
            "document.getElementsById()",
            "document.querySelectorAll()",
            "document.getElementsByClassName()"
        ]
    },
    {
        num: 5,
        q: "Which element should be the parent?",
        a: "body",
        op: [
            "main",
            "section",
            "header",
            "body"
        ]
    },
    {
        num: 6,
        q: "What happens when you use Math.floor() on a non-number?",
        a: "returns a NaN",
        op: [
            "returns an error",
            "returns a NaN",
            "returns a null",
            "returns an unidentified object"
        ]
    },
    {
        num: 7,
        q: "Which of the following is NOT a valid css combinator?",
        a: "boo < far",
        op: [
            "foo > bar",
            "boo bar",
            "boo < far",
            "foo ~ far"
        ]
    },
    {
        num: 8,
        q: "Which of the following is a valid git command?",
        a: "git rm",
        op: [
            "git commit -A",
            "git add -m",
            "git rn",
            "git rm"
        ]
    },
    {
        num: 9,
        q: "Which of the following is NOT a valid value for justify-content?",
        a: "space-about",
        op: [
            "space-around",
            "space-about",
            "space-between",
            "space-evenly"
        ]
    },
    {
        num: 10,
        q: "Which of the following is a valid value for align-items?",
        a: "stretch",
        op: [
            "stretch",
            "centerline",
            "squish",
            "flex-center"
        ]
    },
]

//Short Countdown before the start of the quiz
function preCountdown () {
    pCounter = setInterval(timer, 1000)
    timerEl.textContent = 'Ready?'
    function timer () {
        timerEl.textContent = preTime;
        preTime --;

        if (preTime < 0 ){ 
            gameTimer(gameTime);
            nextQuestion(qLeft);
        }
    }
}

//Timer for the quiz
function gameTimer () {
    clearInterval(pCounter) //Prevents preCountdown from re-executing
    preTime = 3;
    counter = setInterval(timer, 1000);
    function timer () {
        timerEl.textContent = gameTime
        gameTime --;

        if (gameTime === 0){
            clearInterval(counter);

            gameOver(); //Game over condition: Timer runs out
        }
    }
}

//Function for extracting a random question from the repo and displaying it
function nextQuestion (qNum) {
    document.getElementById('skipButton').setAttribute('style', 'display: shown')
    let index = Math.floor(Math.random() * qNum)
    qIndex = index //For selectedOption() below to be able to retrieve the correct answer
    let qText = document.getElementById('qText')

    let qTag = '<span>'+ qNumber + ". " + questions[index].q +'</span>';
    let oTag = 
    '<div class = "option"><span>' + questions[index].op[0] + '</span></div>' + 
    '<div class = "option"><span>' + questions[index].op[1] + '</span></div>' + 
    '<div class = "option"><span>' + questions[index].op[2] + '</span></div>' + 
    '<div class = "option"><span>' + questions[index].op[3] + '</span></div>';

    qText.innerHTML = qTag;
    oList.innerHTML = oTag;
    
    var option = oList.querySelectorAll(".option");

    // Makes each option clickable and proceeds to selectedOption() below
    for(i = 0; i < option.length; i ++){
        option[i].setAttribute("onclick", "selectedOption(this)");
    }
}

//Evaluates if the selected option is correct
function selectedOption (option) {
    let uAns = option.textContent;
    let cAns = questions[qIndex].a;

    questions.splice(qIndex, 1) //removes the selected question from the question list to avoid doubling up

    qLeft --;
    qNumber ++;

    if (uAns == cAns) {
        console.log ("correct answer")
        if (qLeft > 0){
            nextQuestion(qLeft)
        } else {
            gameOver (); //Game over condition: all questions answered
        }

    } else {
        console.log ("incorrect answer")
        gameTime -= 5;
        qWrong ++;

        if (qWrong == 3){
            gameTime = 0;
            gameOver() //Game over condition: 3 wrongs accrued

        } else if (qLeft > 0){
            nextQuestion(qLeft)

        } else {
            gameOver() //Game over condition: all questions answered
        }
    }
}

//Function for determining results of the quiz
function gameOver () {
    clearInterval(counter);

    qBox.setAttribute("style", "display: none")
    rBox.setAttribute("style", "display: fixed")
    
    if (gameTime <= 0) {
        eMess.textContent = "Sorry, you got a 0. Try again next time!"
    } else {    
        checkScores (gameTime); //Score is determined by time remaining on the clock
    }
}

function checkScores (score) {
    let lowestScore = 0;

    //Checks if there is a tenth high score. If not, proceeds as though the tenth high score is 0
    if (highScores[highScoreNum - 1] != null || highScores[highScoreNum - 1] != undefined){
        lowestScore = highScores[9].score;
    } else {
        lowestScore = 0;
    }

    if (score > lowestScore) {
        eMess.textContent = "You attained a high score!"
        saveHighScore (score);
        showHighScores();
    } else {
        eMess.textContent = "Sorry, you did not attain a high score."
    }
}

//Saves high scores using inputted initials and score, also sorts list for display
function saveHighScore (score) {
    let playerInitials = prompt("You got a high score! Enter two initials: ");
    while (playerInitials.length != 2) {
        playerInitials = prompt("Please enter two letters for your initials: ");
    }
    let newScore = {playerInitials, score};

    highScores.push(newScore);

    highScores.sort((a, b) => b.score - a.score);
    
    highScores.splice(highScoreNum);
    
    localStorage.setItem("highScoreList", JSON.stringify(highScores));

}

//Displays high scores
function showHighScores () {
    let highScoreList = document.getElementById("highScoreList");
    
    highScoreList.innerHTML = highScores
    .map((score) => `<li>${score.playerInitials} - ${score.score}`)
    .join('');  
}

//The following provide functionality to the buttons used
document.getElementById("startButton").addEventListener("click", function(){
    init()

    //Redundancy for in case player presses "start" to restart the game
    clearInterval(counter)
    clearInterval(pCounter)
    rBox.setAttribute('style', 'display: none')
    
    iBox.setAttribute("style", "display: none")
    hSList.setAttribute("style", "display: none")
    qBox.setAttribute("style", "display: shown")
    qText.innerHTML = ''
    oList.innerHTML = ''
    
    preCountdown();

    if (preTime < 0){
        nextQuestion(qLeft);
    }    
})
document.getElementById("skipButton").addEventListener("click", function(){
    if (skipLeft > 0){
        gameTime -= 3;
        questions.splice(qIndex, 1)
        skipLeft -= 1;
        qLeft -= 1;
        qNumber ++;
        
        nextQuestion(qLeft);
    }
})
document.getElementById("highScoreButton").addEventListener("click", function() {
    showHighScores();
    var state = hSList.getAttribute("data-state")
    if (state === "hidden"){
        hSList.dataset.state = "shown";
        hSList.setAttribute("style", "display: shown");
        hSList.setAttribute("data-state", "shown");
        iBox.dataset.state = "hidden";
        iBox.setAttribute("style", "display: none");
        iBox.setAttribute("data-state", "hidden");
      }
  
      if (state === "shown"){
        hSList.dataset.state = "hidden";
        hSList.setAttribute("style", "display: none");
        hSList.setAttribute("data-state", "hidden");
      }
})
document.getElementById("infoButton").addEventListener("click", function () {
    let state = iBox.getAttribute("data-state");

    if (state === "hidden"){
        iBox.dataset.state = "shown";
        iBox.setAttribute("style", "display: shown");
        iBox.setAttribute("data-state", "shown");
        hSList.dataset.state = "hidden";
        hSList.setAttribute("style", "display: none");
        hSList.setAttribute("data-state", "hidden");
      }
  
      if (state === "shown"){
        iBox.dataset.state = "hidden";
        iBox.setAttribute("style", "display: none");
        iBox.setAttribute("data-state", "hidden");
      }
})
document.getElementById("restartButton").addEventListener("click", function() {
    init()
    clearInterval(counter)
    clearInterval(pCounter)
    rBox.setAttribute('style', 'display: none')
    
})

init()