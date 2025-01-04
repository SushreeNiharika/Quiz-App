let quizData = [
  {
    question: "What is the capital of Italy?",
    options: ["Rome", "Berlin", "Madrid", "Paris"],
    answer: "Rome",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    answer: "Blue Whale",
  },
  {
    question: "In which year did Christopher Columbus reach the Americas?",
    options: ["1492", "1520", "1607", "1620"],
    answer: "1492",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Jane Austin",
      "Mark Twain",
    ],
    answer: "William Shakespeare",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Southern Ocean",
      "Pacific Ocean",
    ],
    answer: "Pacific Ocean",
  },
];

let currentQuestionIndex = 0;
let userAnswers = [];
let timeLeft = 59;
let timer;

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const scoreContainer = document.getElementById("score-container");
const timerDisplay = document.getElementById("timer");

nextButton.addEventListener("click", loadNextQuestion);
submitButton.addEventListener("click", showQuizResults);

// Start the quiz
displayQuestion();
startTimer();

function updateTimer() {
  if (timeLeft > 0) {
    const seconds = timeLeft;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    timerDisplay.textContent = displaySeconds;
    timeLeft--;
  } else {
    timerDisplay.textContent = "TimeOut";
    showQuizResults();
    clearInterval(timer); // Stop the timer when time is up
  }
}

function startTimer() {
  updateTimer();
  timer = setInterval(updateTimer, 1000); // Start the timer to update every second
}

// Display question functions
function loadNextQuestion() {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
    resetTimer(); // Reset the timer for each new question
  } else {
    alert("Thanks for giving all the answers. Give some remarks!");
  }
}

function selectAnswer(answer) {
  const optionButtons = document.querySelectorAll(".quiz-option");
  optionButtons.forEach((button) => button.classList.remove("selected"));
  const selectedOption = optionsContainer.querySelector(
    `.quiz-option[data-option="${answer}"]`
  );
  selectedOption.classList.add("selected");
  userAnswers[currentQuestionIndex] = answer;
}

function displayQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.question;

  optionsContainer.innerHTML = "";
  const optionLetters = ["A", "B", "C", "D"];

  currentQuestion.options.forEach((option, index) => {
    const optionContainer = document.createElement("div");
    optionContainer.classList.add("quiz-card");

    const optionlevel = document.createElement("span");
    optionlevel.classList.add("option-level");
    optionlevel.textContent = optionLetters[index];
    optionContainer.appendChild(optionlevel);

    const optionButton = document.createElement("button");
    optionButton.classList.add("quiz-option");
    optionButton.textContent = option;
    optionContainer.appendChild(optionButton);
    optionButton.setAttribute("data-option", option);

    optionContainer.addEventListener("click", () => selectAnswer(option));

    optionsContainer.appendChild(optionContainer);
  });
}

// Score evaluation functions
function evaluateUserAnswers() {
  let score = 0;
  quizData.forEach((question, index) => {
    if (userAnswers[index] === question.answer) {
      score += 10;
    }
  });
  return score;
}

function showQuizResults() {
  const userScore = evaluateUserAnswers();
  scoreContainer.textContent = `Your score: ${userScore} out of ${
    quizData.length * 10
  }`;
  clearInterval(timer); // Stop the timer once quiz is submitted
  nextButton.style.display = "none"; // Hide next button after quiz submission
  submitButton.style.display = "none"; // Hide submit button after quiz submission
}
