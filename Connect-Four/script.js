const ROWS = 6;
const COLS = 7;

let board = [];
let currentPlayer = "red";
let gameOver = false;
let redScore = 0;
let yellowScore = 0;

const boardDiv = document.getElementById("board");
const statusText = document.getElementById("status");
const redScoreText = document.getElementById("redScore");
const yellowScoreText = document.getElementById("yellowScore");

function createBoard() {
    boardDiv.innerHTML = "";
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener("click", () => dropDisc(c));
            boardDiv.appendChild(cell);
        }
    }
}

function dropDisc(col) {
    if (gameOver) return;

    for (let row = ROWS - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            const cell = getCell(row, col);
            cell.classList.add(currentPlayer);

            const winCells = checkWin(row, col);
            if (winCells) {
                highlightWin(winCells);
                updateScore();
                statusText.textContent = `🎉 ${currentPlayer.toUpperCase()} Wins!`;
                gameOver = true;
                return;
            }

            if (isDraw()) {
                statusText.textContent = "🤝 It's a Draw!";
                gameOver = true;
                return;
            }

            currentPlayer = currentPlayer === "red" ? "yellow" : "red";
            statusText.textContent = `Player ${currentPlayer === "red" ? "🔴" : "🟡"} Turn`;
            return;
        }
    }
}

function checkWin(row, col) {
    return (
        checkDirection(row, col, 0, 1) ||
        checkDirection(row, col, 1, 0) ||
        checkDirection(row, col, 1, 1) ||
        checkDirection(row, col, 1, -1)
    );
}

function checkDirection(row, col, rDir, cDir) {
    let cells = [[row, col]];
    cells.push(...countCells(row, col, rDir, cDir));
    cells.push(...countCells(row, col, -rDir, -cDir));
    return cells.length >= 4 ? cells : null;
}

function countCells(row, col, rDir, cDir) {
    let result = [];
    let r = row + rDir;
    let c = col + cDir;

    while (
        r >= 0 && r < ROWS &&
        c >= 0 && c < COLS &&
        board[r][c] === currentPlayer
    ) {
        result.push([r, c]);
        r += rDir;
        c += cDir;
    }
    return result;
}

function highlightWin(cells) {
    cells.forEach(([r, c]) => {
        getCell(r, c).classList.add("win");
    });
}

function isDraw() {
    return board.flat().every(cell => cell !== null);
}

function updateScore() {
    if (currentPlayer === "red") {
        redScore++;
        redScoreText.textContent = redScore;
    } else {
        yellowScore++;
        yellowScoreText.textContent = yellowScore;
    }
}

function getCell(row, col) {
    return document.querySelector(
        `.cell[data-row='${row}'][data-col='${col}']`
    );
}

function resetGame() {
    currentPlayer = "red";
    gameOver = false;
    statusText.textContent = "Player 🔴 Turn";
    createBoard();
}

createBoard();
