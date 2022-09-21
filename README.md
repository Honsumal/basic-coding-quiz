# Coding Quiz

## Description

This application is a 10 question multiple-choice quiz of basic knowledge on HTML, CSS, Javascript, or Web APIs. The quiz has a time limit of 50 seconds, with time being deducted for incorrect answers. Completing the quiz yields a score based on the amount of time remaining on the clock, and the used is prompted to enter their initials to the high score list if they score better than the tenth place score (or if said score doesn't exist).

Below are outlines of the important functions used in the application.

### init()
This function initializes the application, setting default values and loading the high score list. This also executes when either the start or restart buttons are pressed.

### gameTimer()
This function is the timer for the game, and also acts as the scoring mechanism. If the gameTime runs out, the quiz ends.

### nextQuestion()
This is function picks a random question from the "questions" array and displays the question and its related options. Each option is also give the class "option" in order to make it clickable and to apply additional styling

### selectedOption()
This function evaluates whether or not the user selected the correct answer. It compares the user's answer with the correct answer before executing logic from there. The "questions" array is also spliced within this function so that the user doesn't answer the same question multiple times. The quiz ends if either the user answers 3 questions wrong, or the "questions" array is exhausted.

### gameOver(), checkScores(), saveHighScore()
This function triggers when either a) gameTime runs out, b) the user got 3 questions wrong, or c) when the "questions" array has been exhausted. If the user completed the quiz, the application checks whether or not they achieved a high score, and prompts the user to enter their initials if they have to record their score.

## Installation

This application runs from the browser and thus needs no installation.

## Usage
The site is fully operational. Link to deployed webpage: https://honsumal.github.io/basic-coding-quiz/

A screenshot of the completed application is provided below:

![Completed Webpage Image](/assets/images/finished-webpage.png)

## Credits

N/A

## License

N/A

