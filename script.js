const cells = document.querySelectorAll(".game-board button");

const status = document.querySelector(".status");

const xScore = document.querySelector("#x-score");
const oScore = document.querySelector("#o-score");
const drawScore = document.querySelector("#draw-score");

const resetButton = document.querySelector(".reset-button");
const resetScoreButton = document.querySelector(".reset-score-button");

let currentPlayer = "X";
let gameActive = true;

let scores = JSON.parse(localStorage.getItem("ticTacToeScores")) || {
    X: 0,
    O: 0,
    draws: 0
};

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

updateScore();

cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
});

function handleCellClick(event) {
    const cell = event.target;

    if (cell.textContent !== "" || !gameActive) {
        return;
    }

    cell.textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {
    for (const combination of winningCombinations) {
        const first = cells[combination[0]].textContent;
        const second = cells[combination[1]].textContent;
        const third = cells[combination[2]].textContent;

        if (
            first !== "" &&
            first === second &&
            second === third
        ) {
            combination.forEach((index) => {
                cells[index].classList.add("winner");
            });

            scores[currentPlayer]++;
            saveScore();
            updateScore();

            status.textContent = `Player ${currentPlayer} Wins! 🏆`;
            gameActive = false;

            return;
        }
    }

    const boardFull = [...cells].every(
        (cell) => cell.textContent !== ""
    );

    if (boardFull) {
        scores.draws++;
        saveScore();
        updateScore();

        status.textContent = "It's a Draw! 🤝";
        gameActive = false;

        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    status.textContent = `Player ${currentPlayer}'s Turn`;
}

function updateScore() {
    xScore.textContent = scores.X;
    oScore.textContent = scores.O;
    drawScore.textContent = scores.draws;
}

function saveScore() {
    localStorage.setItem(
        "ticTacToeScores",
        JSON.stringify(scores)
    );
}

resetButton.addEventListener("click", resetGame);

function resetGame() {
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("winner");
    });

    currentPlayer = "X";
    gameActive = true;

    status.textContent = "Player X's Turn";
}

resetScoreButton.addEventListener("click", resetScores);

function resetScores() {
    scores = {
        X: 0,
        O: 0,
        draws: 0
    };

    saveScore();
    updateScore();

    resetGame();
}