//! Getting Elements From the HTML and Base logic Part

const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const restart = document.getElementById("restart");

//! Winning Condition

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//! Player Properties

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

//!Business Logics (Required Functions) for the Game

//! Intializaing the Game

function initializeGame() {
  cells.forEach((ele) => ele.addEventListener("click", clickingCell));
  restart.addEventListener("click", restartGame);
  message.textContent = `${currentPlayer}'s turn`;
  running = true;
}

//! While Clicking The Cell

function clickingCell() {
  //console.log("Cell is clicked");
  const cellIndex = this.getAttribute("cellIndex");
  //console.log(cellIndex);
  if (options[cellIndex] != "" || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}

//! Updating the cell value

function updateCell(cell, index) {
  //console.log("Cell Updated");
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

//! Changing the player
function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  //console.log(currentPlayer);
  message.textContent = `${currentPlayer}'s turn`;
}

//! checking the Winner

function checkWinner() {
  //console.log("Winner Checked");
  let win = false;
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      win = true;
      break;
    }
  }
  if (win) {
    message.textContent = `${currentPlayer} Wins 😍!`;
    running = false;
  } else if (!options.includes("")) {
    message.textContent = `Match Draw 😒`;
    running = false;
  } else {
    changePlayer();
  }
}

//! Restarting the Game

function restartGame() {
  //console.log("Game restarted");
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  message.textContent = `${currentPlayer}'s turn`;
  cells.forEach((ele) => (ele.textContent = ""));
  running = true;
}