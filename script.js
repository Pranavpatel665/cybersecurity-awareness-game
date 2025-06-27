// Load sound effects
const correctSound = new Audio('correct.mp3');
const wrongSound = new Audio('wrong.mp3');
const winSound = new Audio('win.mp3');
const questions = [
  {
    question: "You receive an email asking for your password. What do you do?",
    answers: [
      { text: "Ignore it and report it", correct: true },
      { text: "Reply with the password", correct: false },
      { text: "Click the link immediately", correct: false }
    ]
  },
  {
    question: "Which of these is a type of malware?",
    answers: [
      { text: "Trojan", correct: true },
      { text: "Firewall", correct: false },
      { text: "Antivirus", correct: false }
    ]
  },
  {
    question: "What makes a password strong?",
    answers: [
      { text: "123456", correct: false },
      { text: "Your name", correct: false },
      { text: "A mix of letters, numbers & symbols", correct: true }
    ]
  },
  {
    question: "What should you do if you suspect a phishing website?",
    answers: [
      { text: "Close it and report to IT", correct: true },
      { text: "Login anyway", correct: false },
      { text: "Share it with friends", correct: false }
    ]
  },
  {
    question: "Ransomware does what?",
    answers: [
      { text: "Speeds up your computer", correct: false },
      { text: "Encrypts your files for ransom", correct: true },
      { text: "Protects against hackers", correct: false }
    ]
  },
  {
    question: "What's the best way to secure your online accounts?",
    answers: [
      { text: "Using one password everywhere", correct: false },
      { text: "Using 2FA and unique passwords", correct: true },
      { text: "Sharing passwords with friends", correct: false }
    ]
  },
  {
    question: "Which of these is a sign of phishing?",
    answers: [
      { text: "Urgent tone asking for action", correct: true },
      { text: "Your name spelled correctly", correct: false },
      { text: "Coming from a known contact", correct: false }
    ]
  },
  {
    question: "What should you avoid clicking in emails?",
    answers: [
      { text: "Links with strange URLs", correct: true },
      { text: "Company logos", correct: false },
      { text: "Sender’s profile picture", correct: false }
    ]
  },
  {
    question: "Social engineering involves...",
    answers: [
      { text: "Using psychological tricks", correct: true },
      { text: "Hardware hacking only", correct: false },
      { text: "Just software programming", correct: false }
    ]
  },
  {
    question: "To prevent malware infections, you should...",
    answers: [
      { text: "Open all email attachments", correct: false },
      { text: "Install updates regularly", correct: true },
      { text: "Turn off antivirus", correct: false }
    ]
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const timerDisplay = document.getElementById("timer");

function showQuestion() {
  resetState();
  startTimer();
  let q = questions[currentQuestion];
  questionEl.innerText = `Q${currentQuestion + 1}: ` + q.question;
  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.innerText = answer.text;
    btn.addEventListener("click", () => selectAnswer(btn, answer.correct));
    answersEl.appendChild(btn);
  });
}

function resetState() {
  clearInterval(timer);
  timeLeft = 15;
  timerDisplay.innerText = `⏱️ Time Left: ${timeLeft}s`;
  nextBtn.style.display = "none";
  answersEl.innerHTML = "";
  resultEl.innerText = "";
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `⏱️ Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeout();
    }
  }, 1000);
}

function selectAnswer(button, correct) {
      if (correct) {
    correctSound.play(); // Play "correct" sound
  } else {
    wrongSound.play(); // Play "wrong" sound
  }
  clearInterval(timer);
  if (correct) {
    button.classList.add("correct");
    score++;
    scoreEl.innerText = score;
  } else {
    button.classList.add("wrong");
  }

  Array.from(answersEl.children).forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === questions[currentQuestion].answers.find(a => a.correct).text) {
      btn.classList.add("correct");
    }
  });

  nextBtn.style.display = "inline-block";
}

function handleTimeout() {
  resultEl.innerText = "⏰ Time’s up!";
  Array.from(answersEl.children).forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === questions[currentQuestion].answers.find(a => a.correct).text) {
      btn.classList.add("correct");
    }
  });
  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});
 
function showResult() {
  questionEl.innerText = "🎉 Quiz Complete!";
  answersEl.innerHTML = `<p>You scored <strong>${score}</strong> out of <strong>${questions.length}</strong>.</p>`;
  timerDisplay.style.display = "none";
  nextBtn.style.display = "none";
  resultEl.innerText = "Well done, Cyber Guardian!";
   winSound.play(); // ✅ safe to play here since it's triggered by button click
  launchConfetti(); // 🎊 celebration
}

showQuestion();
