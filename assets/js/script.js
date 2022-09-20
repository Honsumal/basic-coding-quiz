let timerEl = document.querySelector(".timer");
let startButton = document.getElementById("startButton");
let hSButton = document.getElementById("highScoreButton");
let hSList = document.getElementById("highScoreList");
let iButton = document.getElementById("infoButton");
let iBox = document.getElementById("infoBox");

let highScoreNum = 10;
let highScores = [];

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

//timer 5 s windup, 100s count
//wrong answer = -10, skip = -5

function gameOver () {
    checkScores (account.score);
}

function checkScores (score) {
    if (highScores[highScoreNum] !== null){
        lowestScore = 0
    } else {
        lowestScore = 0
    }

    if (score > lowestScore) {
        saveHighScore (score);
        showHighScores();
    } else {
        alert("Sorry, you did not attain a high score")
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

hSButton.addEventListener("click", function() {
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

iButton.addEventListener("click", function (){
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

document.getElementById("quit").addEventListener("click", function(){
        window.location.reload();
    })


init()