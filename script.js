var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

var quizQuestions = [{
    question: "What is the correct sequence of HTML tags for starting a webpage?",
    choiceA: "Head, Title, HTML",
    choiceB: "Title, Head, HTML",
    choiceC: "HTML, Head, Title",
    choiceD: "All of these",
    correctAnswer: "c"},
  {
    question: "What does HTML stand for?",
    choiceA: "Hyper Text Markup Language",
    choiceB: "Hyperlinks and Text Markup Language",
    choiceC: "Home Tool Markup Language",
    choiceD: "Home and Text Markup Language",
    correctAnswer: "a"},
   {
    question: "Choose the correct HTML tag for the largest heading.",
    choiceA: "H1",
    choiceB: "Heading",
    choiceC: "Head",
    choiceD: "H6",
    correctAnswer: "a"},
    {
    question: "Choose the correct HTML tag to make text bold?",
    choiceA: "Bold",
    choiceB: "B",
    choiceC: "Bld",
    choiceD: "Bl",
    correctAnswer: "b"},
    {
    question: "JavaScript File Has An Extension of:",
    choiceA: ".Java",
    choiceB: ".html",
    choiceC: ".javascript",
    choiceD: ".js",
    correctAnswer: "a"},  
    {
    question: "GetMonth() returns The Month as:",
    choiceA: "Int",
    choiceB: "Float",
    choiceC: "Char",
    choiceD: "String",
    correctAnswer: "a"},
    {
    question: "Inside which HTML element do we put the JavaScript?",
    choiceA: "Js",
    choiceB: "JavaScript",
    choiceC: "Script",
    choiceD: "Scripting",
    correctAnswer: "b"},
    {
    question: "How can you open a link in a new browser window",
    choiceA: "_blank",
    choiceB: "Target",
    choiceC: "Same",
    choiceD: "Open",
    correctAnswer: "a"},
    {
    question: "How can you create an e-mail link?",
    choiceA: "Csa",
    choiceB: "Xxx@yyy",
    choiceC: "Cas",
    choiceD: "Cast",
    correctAnswer: "c"},
    {
        question: "Who is making the web standards?",
        choiceA: "Mozilla",
        choiceB: "Microsoft",
        choiceC: "The World Wide Web Consortium",
        choiceD: "Wikipedia",
        correctAnswer: "c"},


    ];
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};


function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

submitScoreBtn.addEventListener("click", function highscore(){


    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }

});

function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
    }else{
        showScore();
    }
}

startQuizButton.addEventListener("click",startQuiz);