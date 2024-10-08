const questions = [
  {
    question: "What is the sum of 130+125+191?",
    options: ["335", "456", "446", "426"],
    answer: 2,
  },
  {
    question: "If we minus 712 from 1500, how much do we get?",
    options: ["788", "778", "768", "758"],
    answer: 0,
  },
  {
    question: "50 times of 8 is equal to:",
    options: ["80", "400", "800", "4000"],
    answer: 1,
  },
  {
    question: "If set A = {1, 2, 3, 4, 5,…} is given, then it represents:",
    options: [
      "Whole numbers",
      "Rational Numbers",
      "Natural numbers",
      "Complex numbers",
    ],
    answer: 2,
  },
  {
    question: "20+(90÷2) is equal to:",
    options: ["50", "55", "65", "60"],
    answer: 2,
  },
];

let currentQuestionIndex =
  parseInt(localStorage.getItem("currentQuestionIndex")) || 0;
let score = parseInt(localStorage.getItem("score")) || 0;
let timer;
const maxTime = 10;

document.addEventListener("DOMContentLoaded", () => {
  showStartButton();
});

function showStartButton() {
  const quizContainer = document.getElementById("quiz-container");
  let message = "";

  if (localStorage.getItem("currentQuestionIndex")) {
    message = `<span class="message">Don't worry, the quiz will resume from where you left off.</span>`;
  }

  quizContainer.innerHTML = `
        <h1>Some Rule of this Quiz</h1>
        ${message}
      <ul class="rule-list">
        <li>1. Present 5 questions, each with 4 multiple-choice answers.</li>
        <li>2. You will have only <span class="some-important">10 seconds</span> per each question.</li>
        <li>3. You cannot skip or return to previous questions</li>
        <li>4. If you refresh the page, Don't worry, the quiz will resume from where you left off.</li>
        <li>5. After answering all questions, show a score out of 5.</li>
      </ul>
      <button class="btn" id="start-btn">Start Quiz</button>
    `;
  document.getElementById("start-btn").addEventListener("click", startQuiz);
}

function startQuiz() {
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function loadQuestion() {
  const quizContainer = document.getElementById("quiz-container");
  const questionObj = questions[currentQuestionIndex];

  quizContainer.innerHTML = `
        <h2 class="question">${questionObj.question}</h2>
        <div class="options">
            ${questionObj.options
              .map(
                (option, index) =>
                  `<label class="option"><input type="radio" name="answer" value="${index}"> ${option}</label>`
              )
              .join("")}
        </div>
        <div class="question-progress">Question <span class="important-text">${
          currentQuestionIndex + 1
        }</span> of ${questions.length}</div>
        <div class="timer-wrap"><div id="timer">Time left : ${maxTime} s</div>
        <button class="btn" id="submit-btn" disabled>Submit</button></div>
    `;

  startTimer();

  const options = document.querySelectorAll("input[name='answer']");
  options.forEach((option) => {
    option.addEventListener("change", () => {
      document.getElementById("submit-btn").disabled = false;
    });
  });

  document.getElementById("submit-btn").addEventListener("click", handleSubmit);
}

function handleSubmit() {
  const selectedOption = document.querySelector("input[name='answer']:checked");

  if (selectedOption) {
    const userAnswer = parseInt(selectedOption.value);
    // console.log(userAnswer)
    if (userAnswer === questions[currentQuestionIndex].answer) {
      score++;
    }
    currentQuestionIndex++;
    localStorage.setItem("score", score);
    localStorage.setItem("currentQuestionIndex", currentQuestionIndex);

    if (currentQuestionIndex < questions.length) {
      clearTimeout(timer);
      loadQuestion();
    } else {
      showScore();
    }
  }
}

function startTimer() {
  let timeLeft = maxTime;
  const timerElement = document.getElementById("timer");

  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time left : ${timeLeft} s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      autoSubmit();
    }
  }, 1000);
}

function autoSubmit() {
  currentQuestionIndex++;
  localStorage.setItem("currentQuestionIndex", currentQuestionIndex);

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = `
        <h2>Quiz Result</h2>
        <div class="score">You scored ${score} out of ${questions.length} &#127881;</div>
    `;
  localStorage.removeItem("currentQuestionIndex");
  localStorage.removeItem("score");
}
