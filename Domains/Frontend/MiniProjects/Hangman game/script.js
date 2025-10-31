const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const keyboardEl = document.getElementById('keyboard');
const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');

// --- Game Data ---
const wordList = [
  "javascript", "hangman", "developer", "algorithm",
  "keyboard", "puzzle", "variable", "function",
  "react", "python", "project", "computer",
  "internet", "dynamic", "syntax", "frontend"
];

let selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
const correctLetters = [];
const wrongLetters = [];

// --- Draw Hangman parts ---
function drawHangman(errors) {
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#333";
  
  if (errors === 1) { // Base
    ctx.beginPath();
    ctx.moveTo(10, 240);
    ctx.lineTo(190, 240);
    ctx.stroke();
  }
  if (errors === 2) { // Pole
    ctx.beginPath();
    ctx.moveTo(50, 240);
    ctx.lineTo(50, 20);
    ctx.stroke();
  }
  if (errors === 3) { // Top bar
    ctx.beginPath();
    ctx.moveTo(50, 20);
    ctx.lineTo(150, 20);
    ctx.stroke();
  }
  if (errors === 4) { // Rope
    ctx.beginPath();
    ctx.moveTo(150, 20);
    ctx.lineTo(150, 50);
    ctx.stroke();
  }
  if (errors === 5) { // Head
    ctx.beginPath();
    ctx.arc(150, 70, 20, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (errors === 6) { // Body
    ctx.beginPath();
    ctx.moveTo(150, 90);
    ctx.lineTo(150, 160);
    ctx.stroke();
  }
  if (errors === 7) { // Left Arm
    ctx.beginPath();
    ctx.moveTo(150, 100);
    ctx.lineTo(120, 130);
    ctx.stroke();
  }
  if (errors === 8) { // Right Arm
    ctx.beginPath();
    ctx.moveTo(150, 100);
    ctx.lineTo(180, 130);
    ctx.stroke();
  }
  if (errors === 9) { // Left Leg
    ctx.beginPath();
    ctx.moveTo(150, 160);
    ctx.lineTo(130, 200);
    ctx.stroke();
  }
  if (errors === 10) { // Right Leg (Final)
    ctx.beginPath();
    ctx.moveTo(150, 160);
    ctx.lineTo(170, 200);
    ctx.stroke();
  }
}

// --- Display Word ---
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(letter => `
        <span class="letter">
          ${correctLetters.includes(letter) ? letter : ''}
        </span>
      `)
      .join('')}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');
  if (innerWord === selectedWord) {
    finalMessage.innerText = '🎉 Congratulations! You won!';
    popup.style.display = 'flex';
  }
}

// --- Update Wrong Letters ---
function updateWrongLetters() {
  wrongLettersEl.innerText = wrongLetters.join(' ');
  drawHangman(wrongLetters.length);

  if (wrongLetters.length === 10) {
    finalMessage.innerText = `😢 You lost! The word was "${selectedWord}".`;
    popup.style.display = 'flex';
  }
}

// --- Create On-screen Keyboard ---
function createKeyboard() {
  const keys = 'abcdefghijklmnopqrstuvwxyz'.split('');
  keys.forEach(key => {
    const btn = document.createElement('button');
    btn.classList.add('key');
    btn.innerText = key;
    btn.addEventListener('click', () => handleGuess(key));
    keyboardEl.appendChild(btn);
  });
}

// --- Handle Guess ---
function handleGuess(letter) {
  if (correctLetters.includes(letter) || wrongLetters.includes(letter)) return;

  if (selectedWord.includes(letter)) {
    correctLetters.push(letter);
    displayWord();
  } else {
    wrongLetters.push(letter);
    updateWrongLetters();
  }
}

// --- Restart Game ---
playAgainBtn.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  popup.style.display = 'none';
  wrongLettersEl.innerText = '';
  displayWord();
});

// --- Init ---
displayWord();
createKeyboard();