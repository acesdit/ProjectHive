document.addEventListener("DOMContentLoaded", () => {
    
    // --- Constants ---
    const GRID_SIZE = 4; // Creates a 4x4 grid of boxes (5x5 dots)

    // --- Game State ---
    let currentPlayer = 1;
    let scores = { 1: 0, 2: 0 };
    let lines = {}; // Stores the state of all lines (e.g., 'h-0-0': 1)
    let boxes = {}; // Stores the state of all boxes (e.g., 'box-0-0': 2)
    let totalBoxes = GRID_SIZE * GRID_SIZE;
    let boxesClaimed = 0;

    // --- DOM Elements ---
    const board = document.getElementById("game-board");
    const score1El = document.getElementById("score-p1");
    const score2El = document.getElementById("score-p2");
    const card1El = document.getElementById("card-player-1");
    const card2El = document.getElementById("card-player-2");
    const restartButton = document.getElementById("restart-button");
    const modalRestartButton = document.getElementById("modal-restart-button");
    const winnerMessage = document.getElementById("winner-message");
    // Ensure Bootstrap's Modal is available
    const gameOverModal = new bootstrap.Modal(document.getElementById('game-over-modal'));

    /**
     * Initializes the entire game.
     */
    function initGame() {
        // Reset state
        currentPlayer = 1;
        scores = { 1: 0, 2: 0 };
        lines = {};
        boxes = {};
        boxesClaimed = 0;

        createBoard();
        updateScoreboard();

        // Add event listeners for restart
        restartButton.addEventListener("click", initGame);
        modalRestartButton.addEventListener("click", () => {
            gameOverModal.hide();
            initGame();
        });
    }

    /**
     * Creates the dynamic HTML/CSS grid for the game.
     */
    function createBoard() {
        board.innerHTML = ""; // Clear existing board
        
        // Grid size is (GRID_SIZE * 2 + 1)
        const totalGridSize = GRID_SIZE * 2 + 1;

        // Set up CSS grid columns and rows
        // e.g., "20px 1fr 20px 1fr 20px" (dot, box, dot, box, dot)
        const gridTemplate = `repeat(${GRID_SIZE}, auto 1fr) auto`;
        board.style.gridTemplateColumns = gridTemplate;
        board.style.gridTemplateRows = gridTemplate;

        for (let i = 0; i < totalGridSize; i++) {
            for (let j = 0; j < totalGridSize; j++) {
                const isDot = (i % 2 === 0 && j % 2 === 0);
                const isHLine = (i % 2 === 0 && j % 2 === 1);
                const isVLine = (i % 2 === 1 && j % 2 === 0);
                const isBox = (i % 2 === 1 && j % 2 === 1);

                if (isDot) {
                    board.appendChild(createDot(i, j));
                } else if (isHLine) {
                    // Get 'box' coordinates (e.g., h-line at i=0, j=1 is top of box 0,0)
                    const lineId = `h-${Math.floor(i/2)}-${Math.floor(j/2)}`;
                    lines[lineId] = 0; // 0 = unclaimed
                    board.appendChild(createLine(lineId, 'h-line'));
                } else if (isVLine) {
                    // Get 'box' coordinates (e.g., v-line at i=1, j=0 is left of box 0,0)
                    const lineId = `v-${Math.floor(i/2)}-${Math.floor(j/2)}`;
                    lines[lineId] = 0; // 0 = unclaimed
                    board.appendChild(createLine(lineId, 'v-line'));
                } else if (isBox) {
                    const boxId = `box-${Math.floor(i/2)}-${Math.floor(j/2)}`;
                    boxes[boxId] = 0; // 0 = unclaimed
                    board.appendChild(createBox(boxId));
                }
            }
        }
    }

    // --- Element Creation Helpers ---

    function createDot() {
        const dot = document.createElement('div');
        dot.className = "dot";
        return dot;
    }

    function createLine(id, className) {
        const line = document.createElement('div');
        line.id = id;
        line.className = `line ${className}`;
        line.addEventListener("click", handleLineClick);
        return line;
    }

    function createBox(id) {
        const box = document.createElement('div');
        box.id = id;
        box.className = "box";
        return box;
    }

    // --- Game Logic ---

    /**
     * Handles a player's click on a line.
     */
    function handleLineClick(event) {
        const line = event.target;
        const lineId = line.id;

        // Check if line is already claimed
        if (lines[lineId] !== 0) {
            return;
        }

        // Claim the line
        lines[lineId] = currentPlayer;
        line.classList.add("claimed", `player-${currentPlayer}`);

        // Check if this move completed any boxes
        const boxesCompleted = checkNewBoxes();
        
        if (boxesCompleted > 0) {
            scores[currentPlayer] += boxesCompleted;
            boxesClaimed += boxesCompleted;
            // Player gets an extra turn, so we DON'T switch
        } else {
            // No box, switch player
            switchPlayer();
        }

        updateScoreboard();

        // Check for game end
        if (boxesClaimed === totalBoxes) {
            endGame();
        }
    }

    /**
     * Checks all boxes to see if any new ones were completed.
     * @returns {number} The number of boxes completed this turn.
     */
    function checkNewBoxes() {
        let newBoxesCompleted = 0;
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                const boxId = `box-${r}-${c}`;
                
                // Check if this box is already claimed
                if (boxes[boxId] !== 0) {
                    continue;
                }
                
                // Get the IDs of the 4 surrounding lines
                const top = `h-${r}-${c}`;
                const bottom = `h-${r + 1}-${c}`;
                const left = `v-${r}-${c}`;
                const right = `v-${r}-${c + 1}`;

                // Check if all 4 lines are claimed
                if (lines[top] !== 0 && lines[bottom] !== 0 && lines[left] !== 0 && lines[right] !== 0) {
                    // Box is complete!
                    boxes[boxId] = currentPlayer;
                    newBoxesCompleted++;
                    
                    // Style the box element
                    document.getElementById(boxId).classList.add(`player-${currentPlayer}`);
                }
            }
        }
        return newBoxesCompleted;
    }

    /**
     * Switches the active player.
     */
    function switchPlayer() {
        currentPlayer = (currentPlayer === 1) ? 2 : 1;
    }

    /**
     * Updates the scoreboard and active player highlights.
     */
    function updateScoreboard() {
        score1El.textContent = scores[1];
        score2El.textContent = scores[2];

        if (currentPlayer === 1) {
            card1El.classList.add("active-player");
            card2El.classList.remove("active-player");
        } else {
            card2El.classList.add("active-player");
            card1El.classList.remove("active-player");
        }
    }

    /**
     * Handles the end of the game.
     */
    function endGame() {
        if (scores[1] > scores[2]) {
            winnerMessage.textContent = "Player 1 Wins!";
        } else if (scores[2] > scores[1]) {
            winnerMessage.textContent = "Player 2 Wins!";
        } else {
            winnerMessage.textContent = "It's a Draw!";
        }
        gameOverModal.show();
    }

    // --- Start the game ---
    initGame();
});