// Card emojis - 8 pairs
const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let canFlip = true;

// DOM elements
const gameBoard = document.getElementById('gameBoard');
const movesDisplay = document.getElementById('moves');
const matchesDisplay = document.getElementById('matches');
const resetBtn = document.getElementById('resetBtn');
const winMessage = document.getElementById('winMessage');
const finalMovesDisplay = document.getElementById('finalMoves');
const playAgainBtn = document.getElementById('playAgainBtn');

// Initialize game
function initGame() {
    // Reset variables
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    canFlip = true;
    
    // Update displays
    movesDisplay.textContent = moves;
    matchesDisplay.textContent = `${matchedPairs} / 8`;
    winMessage.classList.remove('show');
    
    // Create card pairs
    const cardPairs = [...emojis, ...emojis];
    
    // Shuffle cards
    cards = shuffleArray(cardPairs);
    
    // Clear and create board
    gameBoard.innerHTML = '';
    cards.forEach((emoji, index) => {
        const card = createCard(emoji, index);
        gameBoard.appendChild(card);
    });
}

// Shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Create card element
function createCard(emoji, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;
    card.dataset.emoji = emoji;
    
    card.innerHTML = `
        <div class="card-front">🎴</div>
        <div class="card-back">${emoji}</div>
    `;
    
    card.addEventListener('click', flipCard);
    return card;
}

// Flip card
function flipCard() {
    if (!canFlip) return;
    if (this.classList.contains('flipped')) return;
    if (this.classList.contains('matched')) return;
    
    this.classList.add('flipped');
    flippedCards.push(this);
    
    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Check for match
function checkMatch() {
    canFlip = false;
    moves++;
    movesDisplay.textContent = moves;
    
    const [card1, card2] = flippedCards;
    const emoji1 = card1.dataset.emoji;
    const emoji2 = card2.dataset.emoji;
    
    if (emoji1 === emoji2) {
        // Match found
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            matchesDisplay.textContent = `${matchedPairs} / 8`;
            
            flippedCards = [];
            canFlip = true;
            
            // Check if game is won
            if (matchedPairs === 8) {
                setTimeout(showWinMessage, 500);
            }
        }, 500);
    } else {
        // No match
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

// Show win message
function showWinMessage() {
    finalMovesDisplay.textContent = moves;
    winMessage.classList.add('show');
}

// Event listeners
resetBtn.addEventListener('click', initGame);
playAgainBtn.addEventListener('click', initGame);

// Start game
initGame();