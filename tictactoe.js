const readline = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], //ROWS
  [1, 4, 7], [2, 5, 8], [3, 6, 9], //COLUMNS
  [1, 5, 9], [3, 5, 7]             //DIAGONALS
];
function prompt(msg) {
  console.log(`==> ${msg}`);
}
function findAtRiskSquare(line, board) {
  let markersInLine = line.map(square => board[square]);

  if (markersInLine.filter(val => val === HUMAN_MARKER).length === 2) {
    let unusedSquare = line.find(square => board[square] === INITIAL_MARKER);
    if (unusedSquare !== undefined) {
      return unusedSquare
    }
  }
  return null;
}
function delimiter(arr, symbol) {
  let newString = '';
  for (let i = 0; i < arr.length; i += 1) {
    if (i === arr.length - 1) {
      newString += arr[i];
    } else {
      newString += (arr[i] + symbol + ' ');
    }
  }
  return newString;
}

function addWord(string, word) {
  let stringArr = string.split(' ');
  let resultArr = [];
  for (let j = 0; j < stringArr.length; j += 1) {
    if (j === stringArr.length - 1) {
      resultArr.push(word + ' ' + stringArr[j]);
    } else {
      resultArr.push(stringArr[j]);
    }
  }
  return resultArr.join(' ');
}

function joinOr(arr, symbol = ',', word = 'or') {
  if (arr.length === 0) {
    return '';
  } else if (arr.length === 1) {
    return String(arr);
  } else if (arr.length === 2) {
    return arr.join(` ${word} `);
  } else {
    let stringWithSymbols = delimiter(arr, symbol);
    let stringWithWords = addWord(stringWithSymbols, word);
    return stringWithWords;
  }
}

function displayBoard(board) {
  console.clear();

  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}.`);
  console.log('');
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log('     |     |');
  console.log('');
}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square += 1) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function playerChoosesSquare(board) {
  let square;

  while (true) {
    prompt(`Please choose a square: ${joinOr(emptySquares(board))}`);
    square = readline.question().trim();

    if (emptySquares(board).includes(square)) break;

    prompt ("Sorry. That's not a valid choice.");
  }
  board[square] = HUMAN_MARKER;
}

function computerChoosesSquare(board) {
  let square;
  for (let idx = 0; idx < WINNING_LINES.length; idx += 1) {
    let line = WINNING_LINES[idx];
    square = findAtRiskSquare(line, board);
    if (square) break;
  }
  if (!square) {
    let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
    square = emptySquares(board)[randomIndex];
  }
  board[square] = COMPUTER_MARKER;
}

function boardfull(board) {
  return emptySquares(board).length === 0;
}

function detectWinner(board) {
  for (let line = 0; line < WINNING_LINES.length; line += 1) {
    let [ sq1, sq2, sq3 ] = WINNING_LINES[line];

    if (
      board[sq1] === HUMAN_MARKER &&
      board[sq2] === HUMAN_MARKER &&
      board[sq3] === HUMAN_MARKER
    ) {
      return 'You';
    } else if (
      board[sq1] === COMPUTER_MARKER &&
      board[sq2] === COMPUTER_MARKER &&
      board[sq3] === COMPUTER_MARKER
    ) {
      return 'Computer';
    }
  }
  return null;
}

function someoneWon(board) {
  return !!detectWinner(board);
}

let board = initializeBoard();
displayBoard(board);

while (true) {
  let board = initializeBoard();

  while (true) {
    displayBoard(board);

    playerChoosesSquare(board);
    if (someoneWon(board) || boardfull(board)) break;

    computerChoosesSquare(board);
    if (someoneWon(board) || boardfull(board)) break;
  }
  displayBoard(board);

  if (someoneWon(board)) {
    prompt(`${detectWinner(board)} won!`);
  } else {
    prompt("It's a tie!");
  }
  prompt("Play again? (y or n)");
  let answer = readline.question().toLowerCase()[0];
  if (answer !== 'y') break;
}

prompt("Thanks for playing Tic Tac Toe! I hope you have a great life.");