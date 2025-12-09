// === Game State Variables ===
let player1Name = 'Player X';
let player2Name = 'Player O';
let currentPlayer = 'X'; // 'X' or 'O'
let gameActive = false;
let boardState = ['', '', '', '', '', '', '', '', '']; // Represents cells 1 through 9

// Winning combinations (indices are 0-based for the boardState array)
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// === DOM Elements ===
const setupScreen = document.getElementById('setup-screen');
const gameScreen = document.getElementById('game-screen');
const nameForm = document.getElementById('name-form');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart-button');

// === Functions ===

/**
 * Starts the game, reads names, and switches views.
 */
function startGame(event) {
    event.preventDefault(); // Stop the form from submitting normally (and refreshing)

    const p1Input = document.getElementById('player-1').value.trim();
    const p2Input = document.getElementById('player-2').value.trim();
    
    // Set player names, defaulting if inputs are empty
    player1Name = p1Input || 'Player X';
    player2Name = p2Input || 'Player O';

    // Hide setup screen and show game screen
    setupScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');

    // Initialize game state
    currentPlayer = 'X';
    gameActive = true;
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    
    updateMessage("harsh, you're up");
    restartButton.classList.add('hidden');
}

/**
 * Updates the turn/win message displayed on the board.
 * @param {string} msg - The message to display.
 */
function updateMessage(msg) {
    messageDiv.textContent = msg;
}

/**
 * Handles a cell click event.
 * @param {Event} event - The click event object.
 */
function handleCellClick(event) {
    const clickedCell = event.target;
    // The ID of the cell (1 to 9). Convert to 0-based index.
    const clickedCellIndex = parseInt(clickedCell.id) - 1; 

    // Guard: Check if the game is active OR if the cell is already filled
    if (!gameActive || boardState[clickedCellIndex] !== '') {
        return;
    }

    // 1. Update the board state array
    boardState[clickedCellIndex] = currentPlayer;

    // 2. Update the cell's appearance (DOM)
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());

    // 3. Check for win or draw
    if (checkWin()) {
        const winnerName = (currentPlayer === 'X') ? player1Name : player2Name;
        updateMessage(`${winnerName} congratulations, you won!`);
        gameActive = false;
        restartButton.classList.remove('hidden');
    } else if (checkDraw()) {
        updateMessage("It's a Draw! Play again.");
        gameActive = false;
        restartButton.classList.remove('hidden');
    } else {
        // 4. Switch turns
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        const nextPlayerName = (currentPlayer === 'X') ? player1Name : player2Name;
        updateMessage(`${nextPlayerName} (${currentPlayer}), you're up!`);
    }
}

/**
 * Checks if the current player has won the game.
 * @returns {boolean} True if a win condition is met, false otherwise.
 */
function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        // Check if all three cells are the same and not empty
        return (
            boardState[a] === currentPlayer &&
            boardState[a] === boardState[b] &&
            boardState[a] === boardState[c]
        );
    });
}

/**
 * Checks if the board is full (a draw).
 * @returns {boolean} True if the board is full, false otherwise.
 */
function checkDraw() {
    return boardState.every(cell => cell !== '');
}

/**
 * Resets the game to its initial state (new game with existing names).
 */
function restartGame() {
    // Reset the board array
    boardState = ['', '', '', '', '', '', '', '', ''];
    
    // Clear the visual cells and classes
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });

    // Reset turn and active status
    currentPlayer = 'X';
    gameActive = true;
    
    // Update the message
    updateMessage(`${player1Name} (X), you're up!`);
    
    // Hide the restart button
    restartButton.classList.add('hidden');
}


// === Event Listeners ===

// 1. Listen for the form submission to start the game
nameForm.addEventListener('submit', startGame);

// 2. Listen for clicks on each cell of the board
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// 3. Listen for the restart button click
restartButton.addEventListener('click', restartGame);

// Initial message on the setup screen
updateMessage("Enter names to begin.");