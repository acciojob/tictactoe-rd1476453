let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let gameOver = false;

const submitBtn = document.getElementById("submit");
const gameDiv = document.getElementById("game");
const formDiv = document.getElementById("player-form");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

submitBtn.addEventListener("click", () => {
    player1 = document.getElementById("player1").value;
    player2 = document.getElementById("player2").value;

    if (player1 === "" || player2 === "") {
        alert("Please enter both player names");
        return;
    }

    formDiv.style.display = "none";
    gameDiv.style.display = "block";

    currentPlayer = player1;
    currentSymbol = "X";
    messageDiv.textContent = `${currentPlayer}, you're up`;
});

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (cell.textContent !== "" || gameOver) return;

        cell.textContent = currentSymbol;

        if (checkWinner()) {
            messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
            gameOver = true;
            return;
        }

        switchPlayer();
    });
});

function switchPlayer() {
    if (currentPlayer === player1) {
        currentPlayer = player2;
        currentSymbol = "O";
    } else {
        currentPlayer = player1;
        currentSymbol = "X";
    }
    messageDiv.textContent = `${currentPlayer}, you're up`;
}

function checkWinner() {
    const wins = [
        ["1","2","3"], ["4","5","6"], ["7","8","9"],
        ["1","4","7"], ["2","5","8"], ["3","6","9"],
        ["1","5","9"], ["3","5","7"]
    ];

    return wins.some(pattern => {
        const [a, b, c] = pattern;
        return (
            document.getElementById(a).textContent === currentSymbol &&
            document.getElementById(b).textContent === currentSymbol &&
            document.getElementById(c).textContent === currentSymbol
        );
    });
}
