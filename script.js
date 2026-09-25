const cells = document.querySelectorAll(".game-board button");

let currentPlayer = "X";
let gameActive = true;

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

// Status
const status = document.createElement("h2");
status.className = "status";
status.textContent = "Player X's Turn";

document.body.insertBefore(
    status,
    document.querySelector(".game-board")
);

// Reset button
const resetButton = document.createElement("button");
resetButton.className = "reset-button";
resetButton.textContent = "Reset Game";

document.body.appendChild(resetButton);

// Cell click
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

            status.textContent = `Player ${currentPlayer} Wins! 🏆`;
            gameActive = false;

            return;
        }
    }

    const boardFull = [...cells].every(
        (cell) => cell.textContent !== ""
    );

    if (boardFull) {
        status.textContent = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    status.textContent = `Player ${currentPlayer}'s Turn`;
}

// Reset game
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