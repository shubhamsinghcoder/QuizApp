const questions = [
  {
    question: "Which is largest animal in the world",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },

  {
    question: "Which is smallest country in the world",
    answers: [
      { text: "Vatican city", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "shri Lanka", correct: false },
    ],
  },
  {
    question: "Which is largest desert in the world",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antarctica", correct: true },
    ],
  },
  {
    question: "Which is smallest continent in the world",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => { // starting the quiz
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestions();
};

const showQuestions = () => {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];  // getting the data from the array
  let questionNo = currentQuestionIndex + 1;              // increasing the index number
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // adding the question number and question

  currentQuestion.answers.forEach((answer) => {       // adding the answers to get the array in the answer variable
    const button = document.createElement("button");   // creating the button
    button.innerHTML = answer.text;
    button.classList.add("btn");                       // adding a class on the button
    answerButtons.appendChild(button);                 // add the button tag where we are store the answers

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", (event) => {          // performing a event on the answers button
      const selectedBtn = event.target;
      const isCorrect = selectedBtn.dataset.correct === "true";
      if (isCorrect) {
        selectedBtn.classList.add("correct"); // adding the class when we are click on the correnct or incorrect botton
        score++;
      } else {
        selectedBtn.classList.add("incorrect");
      }
      Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct == "true") {  // checking the data answer is correct
          button.classList.add("correct");
        }
        button.disabled = true;   // if we are not click on the next button the button should be hidden
      });
      nextButton.style.display = "block";  // styleing the next button
    });
  });
};

function resetState() {
  // it will remove the previous questions and answers
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function showScore() {  // it will show you score
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNetButton() {   // for the next button 
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestions();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNetButton();
  } else {
    startQuiz(); // after the finsh the quiz restart the quiz
  }
});

startQuiz();    // showing the questions
