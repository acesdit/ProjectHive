let currentTarget = "";
let score = 0;
let streak = 0;
let bestStreak = 0;
let lives = 3;
let comboMultiplier = 1;
let gameActive = false;
let roundStartTime = 0;
let reactionTimes = [];
let timerInterval = null;
let totalRounds = 0;
let emojis = [
  "😀",
  "😂",
  "😍",
  "😎",
  "🤔",
  "😴",
  "😡",
  "😭",
  "😱",
  "🤯",
  "🥳",
  "😇",
  "🤪",
  "😷",
  "🤢",
  "👻",
  "💩",
  "🎃",
  "🌟",
  "🔥",
];
let difficultySettings = {
  Easy: {
    timePerRound: 3000,
    numberOfDecoys: 2,
    comboThreshold: 3,
  },
  Medium: {
    timePerRound: 2000,
    numberOfDecoys: 4,
    comboThreshold: 5,
  },
  Hard: {
    timePerRound: 1000,
    numberOfDecoys: 6,
    comboThreshold: 7,
  },
};
let currentDifficulty = difficultySettings.Medium;
let roundEmojis = [];
let correctClicks = 0;

const clearGameArea = () => {
  gameArea.innerHTML = "";
};

const gameArea = document.getElementById("game-area");
const targetDisplay = document.getElementById("target-display");
const scoreDisplay = document.getElementById("score-display");
const streakDisplay = document.getElementById("streak-display");
const bestStreakDisplay = document.getElementById("best-streak-display");
const livesDisplay = document.getElementById("lives-display");
const comboBadge = document.getElementById("combo-badge");
const timerBar = document.getElementById("timer-bar");
const gameOverScreen = document.getElementById("game-over-screen");
const difficultySelector = document.getElementById("difficulty-select");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");

const startGame = (difficulty) => {
  // reset core game state
  score = 0;
  streak = 0;
  bestStreak = 0;
  lives = 3;
  comboMultiplier = 1;
  reactionTimes = [];
  correctClicks = 0;
  totalRounds = 0;
  roundEmojis = [];
  gameActive = true;

  if (timerInterval) clearInterval(timerInterval);
  // defensive: if difficulty is invalid, fall back to Medium
  currentDifficulty =
    difficultySettings[difficulty] || difficultySettings.Medium;

  // If the game-over screen was visible, hide it so the game area is interactive again
  if (gameOverScreen) gameOverScreen.style.display = "none";

  updateUI();
  startRound();
};
startRound = () => {
  if (!gameActive) return;
  clearGameArea();
  const randomIndex = Math.floor(Math.random() * emojis.length);
  currentTarget = emojis[randomIndex];
  targetDisplay.textContent = currentTarget;
  totalRounds++;
  roundEmojis = [];
  const numDecoys = currentDifficulty.numberOfDecoys;
  while (roundEmojis.length < numDecoys) {
    const idx = Math.floor(Math.random() * emojis.length);
    const cand = emojis[idx];
    if (cand === currentTarget) continue;
    if (!roundEmojis.includes(cand)) roundEmojis.push(cand);
  }

  const targetPosition = Math.floor(Math.random() * (roundEmojis.length + 1));
  roundEmojis.splice(targetPosition, 0, currentTarget);
  for (let i = roundEmojis.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [roundEmojis[i], roundEmojis[j]] = [roundEmojis[j], roundEmojis[i]];
  }

  gameArea.innerHTML = "";
  const positions = [];

  roundEmojis.forEach((emoji) => {
    const tile = document.createElement("div");
    tile.className = "emoji-tile";
    tile.textContent = emoji;

    let validPosition = false;
    let attempts = 0;
    let top, left;

    while (!validPosition && attempts < 20) {
      top = Math.random() * 80 + 5;
      left = Math.random() * 85 + 5;

      validPosition = true;
      for (let pos of positions) {
        const distance = Math.sqrt(
          Math.pow(top - pos.top, 2) + Math.pow(left - pos.left, 2)
        );
        if (distance < 15) {
          validPosition = false;
          break;
        }
      }
      attempts++;
    }

    positions.push({ top, left });
    tile.style.top = top + "%";
    tile.style.left = left + "%";
    gameArea.appendChild(tile);
  });

  startTimer();
  roundStartTime = Date.now();
  updateUI();
};

const updateUI = () => {
  scoreDisplay.textContent = score;
  streakDisplay.textContent = streak;
  bestStreakDisplay.textContent = bestStreak;
  livesDisplay.textContent = lives;

  const hearts = "❤️ ".repeat(lives).trim();
  livesDisplay.textContent = hearts || "💔";

  if (comboMultiplier > 1) {
    comboBadge.textContent = comboMultiplier + "x";
    comboBadge.style.display = "inline";
  } else {
    comboBadge.style.display = "none";
  }
};

const startTimer = () => {
  if (timerInterval) clearInterval(timerInterval);
  const timePerRound = currentDifficulty.timePerRound;
  timerBar.style.width = "100%";
  timerBar.classList.remove("warning", "danger");

  timerInterval = setInterval(() => {
    updateTimer();
  }, 50);
};
const updateTimer = () => {
  const elapsed = Date.now() - roundStartTime;
  const timePerRound = currentDifficulty.timePerRound;
  const remainingTime = timePerRound - elapsed;
  const percentage = (remainingTime / timePerRound) * 100;

  timerBar.style.width = Math.max(0, percentage) + "%";

  if (percentage < 30 && percentage >= 15) {
    timerBar.classList.add("warning");
    timerBar.classList.remove("danger");
  } else if (percentage < 15) {
    timerBar.classList.add("danger");
    timerBar.classList.remove("warning");
  }

  if (remainingTime <= 0) {
    clearInterval(timerInterval);
    handleTimeout();
  }
};
const handleTimeout = () => {
  streak = 0;
  comboMultiplier = 1;
  lives--;
  updateUI();

  if (lives <= 0) {
    gameOver();
  } else {
    setTimeout(startRound, 500);
  }
};

const handleEmojiClick = (clickedEmoji, element) => {
  if (!gameActive) return;

  if (clickedEmoji === currentTarget) {
    const reactionTime = Date.now() - roundStartTime;
    reactionTimes.push(reactionTime);
    correctClicks++;

    streak++;
    if (streak > bestStreak) {
      bestStreak = streak;
    }

    calculateScore(reactionTime);

    element.classList.add("correct-flash");
    clearInterval(timerInterval);

    setTimeout(() => {
      startRound();
    }, 500);
  } else {
    streak = 0;
    comboMultiplier = 1;
    lives--;

    element.classList.add("shake-error");
    updateUI();

    if (lives <= 0) {
      clearInterval(timerInterval);
      gameOver();
    } else {
      clearInterval(timerInterval);
      setTimeout(() => {
        startRound();
      }, 500);
    }
  }
};

// Scoring
const calculateScore = (reactionTime) => {
  const basePoints = 10;
  let speedBonus = 0;

  if (reactionTime < 500) {
    speedBonus = 50;
  } else if (reactionTime < 800) {
    speedBonus = 30;
  } else if (reactionTime < 1200) {
    speedBonus = 15;
  } else {
    speedBonus = 5;
  }

  if (streak >= currentDifficulty.comboThreshold && comboMultiplier === 1) {
    comboMultiplier = 1.5;
    comboBadge.style.display = "inline";
    comboBadge.style.animation = "pulse 0.5s";
  }

  const points = Math.round((basePoints + speedBonus) * comboMultiplier);
  score += points;

  updateUI();
};

const gameOver = () => {
  gameActive = false;
  if (timerInterval) clearInterval(timerInterval);
  document.getElementById("final-score").textContent = score;
  document.getElementById("final-best-streak").textContent = bestStreak;
  const avgTime =
    reactionTimes.length > 0
      ? Math.round(
          reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length
        )
      : 0;
  document.getElementById("final-avg-time").textContent =
    avgTime > 0 ? avgTime + " ms" : "N/A";

  gameOverScreen.style.display = "flex";
};

startButton.addEventListener("click", () => {
  const selectedDifficulty = difficultySelector.value;
  startGame(selectedDifficulty);
});

restartButton.addEventListener("click", () => {
  const selectedDifficulty = difficultySelector.value;
  startGame(selectedDifficulty);
});

gameArea.addEventListener("click", (event) => {
  if (event.target.classList.contains("emoji-tile")) {
    handleEmojiClick(event.target.textContent, event.target);
  }
});

updateUI();
