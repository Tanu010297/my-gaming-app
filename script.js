
const friendBtn = document.getElementById('friend-btn');
const computerBtn = document.getElementById('computer-btn');
const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const resultMessage = document.getElementById('resultMessage');
const messageText = document.getElementById('messageText');
const restartBtn = document.getElementById('restartBtn');
const nameInputSection = document.getElementById('nameInputSection');
const startGameBtn = document.getElementById('startGameBtn');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');

let currentPlayer = 'X';
let isComputer = false;
let gameActive = false;
let player1Name = '';
let player2Name = '';

const WINNING_COMBINATIONS = [
  [0,1,2], [3,4,5], [6,7,8], 
  [0,3,6], [1,4,7], [2,5,8], 
  [0,4,8], [2,4,6]
];

// Mode selection
friendBtn.addEventListener('click', () => {
  nameInputSection.classList.remove('hide');
  document.querySelector('.mode-selection').classList.add('hide');
});

computerBtn.addEventListener('click', () => {
  isComputer = true;
  player1Name = "You"; // Player is X
  player2Name = "Computer"; // Computer is O
  startGame();
});

// Start Game button (after entering names)
startGameBtn.addEventListener('click', () => {
  player1Name = player1Input.value.trim() || "Player 1";
  player2Name = player2Input.value.trim() || "Player 2";
  isComputer = false;
  startGame();
});

// Restart button
restartBtn.addEventListener('click', restartGame);

function startGame() {
  nameInputSection.classList.add('hide');
  board.classList.remove('hide');
  resultMessage.classList.add('hide');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winning-cell');
    cell.addEventListener('click', handleClick, { once: true });
  });
  gameActive = true;
  currentPlayer = 'X';
}

function handleClick(e) {
  if (!gameActive) return;
  const cell = e.target;
  placeMark(cell, currentPlayer);

  if (checkWin(currentPlayer)) {
    highlightWin(currentPlayer);
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    if (isComputer && currentPlayer === 'O') {
      setTimeout(computerMove, 500);
    }
  }
}

function placeMark(cell, player) {
  cell.textContent = player;
}

function swapTurns() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(player) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.textContent !== '';
  });
}

function endGame(draw) {
  gameActive = false;
  board.classList.add('hide');
  resultMessage.classList.remove('hide');
  if (draw) {
    messageText.textContent = "It's a Draw!";
  } else {
    if (isComputer) {
      messageText.textContent = `${currentPlayer === 'X' ? player1Name : player2Name} Wins! 🎉`;
    } else {
      messageText.textContent = `${currentPlayer === 'X' ? player1Name : player2Name} Wins! 🎉`;
    }
  }
}

function restartGame() {
  document.querySelector('.mode-selection').classList.remove('hide');
  board.classList.add('hide');
  resultMessage.classList.add('hide');
  nameInputSection.classList.add('hide');
  player1Input.value = '';
  player2Input.value = '';
}

function computerMove() {
  let availableCells = [...cells].filter(cell => cell.textContent === '');
  const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
  randomCell.click();
}

function highlightWin(player) {
  WINNING_COMBINATIONS.forEach(combination => {
    if (combination.every(index => cells[index].textContent === player)) {
      combination.forEach(index => {
        cells[index].classList.add('winning-cell');
      });
    }
  });
}

