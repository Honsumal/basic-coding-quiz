let timerEl = document.querySelector(".timer");
let hSList = document.getElementById("highScoreList");
let iBox = document.getElementById("infoBox");
let rBox = document.getElementById("resultsBox")
let eMess = document.getElementById("endMessage")

let highScoreNum = 10;
let highScores = [];

let preTime = 3;
let answerTime = 1.5;
let gameTime = 100;
let counter;
let aCounter;

let qLeft = 10;
let qIndex = 0;
let skipLeft = 3;
let qWrong = 0;

function init() {
    let storedHighScores = JSON.parse(localStorage.getItem("highScoreList"))

    if (storedHighScores !== null) {
        highScores = storedHighScores;
    } 
  }
let questions = [
    {
        index: 1,
        q: "What is HTML",
        a: "HyperText Markup Language",
        op: [
            "Hyperbolic Time Morphing Loghouse",
            "Hyper Text Markup Language",
            "Hyper Texual Marking Language",
            "Hyper Text Mark Language"
        ]
    },
    {
        index: 2,
        q: "What is CSS",
        a: "Cascading Style Sheets",
        op: [
            "Cascading Style Sheets",
            "Cascade Styling Sheets",
            "Crownie's Shooting Star",
            "Computer Styling Sheets"
        ]
    },
    {
        index: 3,
        q: "Which of the following is a HTML tag",
        a: "/td",
        op: [
            "/ti",
            "/tp",
            "/td",
            "/ta"
        ]
    },
    {
        index: 4,
        q: "Which of the following is NOT a valid DOM Traversal method",
        a: "document.getElementsById()",
        op: [
            "document.querySelector()",
            "document.getElementsById()",
            "document.querySelectorAll()",
            "document.getElementsByClassName()"
        ]
    },
    {
        index: 5,
        q: "Which element should be the parent",
        a: "body",
        op: [
            "main",
            "section",
            "header",
            "body"
        ]
    },
    {
        index: 6,
        q: "What happens when you use Math.floor() on a non-number",
        a: "returns a NaN",
        op: [
            "returns an error",
            "returns a NaN",
            "returns a null",
            "returns an unidentified object"
        ]
    },
    {
        index: 7,
        q: "Which of the following is NOT a valid css combinator",
        a: "boo < far",
        op: [
            "foo > bar",
            "boo bar",
            "boo < far ",
            "foo ~ far"
        ]
    },
    {
        index: 8,
        q: "Which of the following is a valid git command",
        a: "git rm",
        op: [
            "git commit -A",
            "git add -m",
            "git rn",
            "git rm"
        ]
    },
    {
        index: 9,
        q: "which of the following is NOT a valid value for justify-content",
        a: "space-about",
        op: [
            "space-around",
            "space-about",
            "space-between",
            "space-evenly"
        ]
    },
    {
        index: 10,
        q: "Which of the following is a valid value for align-items",
        a: "stretch",
        op: [
            "stretch",
            "centerline",
            "squish",
            "flex-center"
        ]
    },
]

function preCountdown () {
    counter = setInterval(timer, 1000)
    function timer () {
        timerEl.textContent = preTime;
        // timerEl.style.fontsize = "36px";
        preTime --;

        if (preTime < 0){
            gameTimer(gameTime)
        }
    }
}

function answerCountdown () {
    aCounter = setInterval(timer, 1000)
    function timer () {
        timerEl.textContent = answerTime;
        answerTime --;
    }
}

function gameTimer () {
    preTime = 3;
    counter = setInterval(timer, 1000);
    function timer () {
        timerEl.textContent = gameTime
        // timerEl.style.fontsize = "16px"
        gameTime --;

        if (gameTime < 0){
            clearInterval(counter);
            timerEl.textContent = "Times Up!";
            gameOver();
        }
    }
}

function nextQuestion (qNum) {
    let index = Math.floor(Math.random() * qNum) - 1
    qIndex = index
    let qText = document.querySelector('#qText')

    let qTag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let oTag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class = "option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class = "option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class = "option"><span>'+ questions[index].options[3] +'</span></div>';
    qText.innerHTML = qTag;
    option_list.innerHTML = oTag;
    
    let option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "selectedOption(this)");
    }

    qLeft --;
}

function selectedOption (option) {
    let uAns = option.textContent;
    let cAns = questions[qIndex].a;

    if (uAns == cAns) {
        option.setAttribute("style", "background-color: green")
        answerCountdown();
        gameTime += 1.5;

        if (answerTime < 0){
            nextQuestion(qLeft)
        }

    } else {
        option.setAttribute("style", "background-color: red")
        answerCountdown();
        gameTime -= 8.5;
        qWrong -= 1;

        if (qWrong == 3){
            gameTime = 0;
            gameOver()

        } else if (answerTime < 0){
            nextQuestion(qLeft)
        }
    }
}

function gameOver () {
    clearInterval(counter);
    clearInterval(aCounter);
    rBox.setAttribute("style", "display: fixed")
    if (time <= 0) {
        eMess.textContent = "Sorry, you got a 0! Try again next time"
    } else {    
        checkScores (gameTime);
    }
}

function checkScores (score) {
    let lowestScore = 0;

    if (highScores[highScoreNum - 1] !== null){
        lowestScore = highScores[9].score.val();
    } else {
        lowestScore = 0;
    }

    if (score > lowestScore) {
        eMess.textContent = "You attained a high score!"
        saveHighScore (score);
        showHighScores();
    } else {
        eMess.textContent = "Sorry, you did not attain a high score"
    }
}

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

function showHighScores () {
    let highScoreList = document.getElementById("highScoreList");
    highScoreList.innerHTML = highScores
    .map((score) => `<li>${score.playerInitials} - ${score.score}`)
    .join('');   
}

document.getElementById("startButton").addEventListener("click", function(){
    iBox.setAttribute("style", "display: none")
    preCountdown();

    if (preTime < 0){
        nextQuestion();
    }    
})

document.getElementById("skipButton").addEventListener("click", function(){
    if (skipLeft > 0){
        gameTime -= 5;
        nextQuestion()
    }
})

document.getElementById("highScoreButton").addEventListener("click", function() {
    showHighScores();
    var state = hSList.getAttribute("data-state")
    if (state === "hidden"){
        hSList.dataset.state = "shown";
        hSList.setAttribute("style", "display: shown");
        hSList.setAttribute("data-state", "shown");
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
      }
  
      if (state === "shown"){
        iBox.dataset.state = "hidden";
        iBox.setAttribute("style", "display: none");
        iBox.setAttribute("data-state", "hidden");
      }
    })

document.getElementById("quitButton").addEventListener("click", function() {
        window.location.reload();
    })

document.getElementById("restartButton").addEventListener("click", function() {
    iBox.setAttribute("style", "display: none")
    preCountdown();

    if (preTime < 0){
        nextQuestion();
    }    
})

init()