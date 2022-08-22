const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'Spock'];

function prompt(message) {
  console.log(`=> ${message}`);
}

function displayChoice(userChoice, computerChoice) {
  prompt(`You chose ${userChoice}. Computer chose ${computerChoice}`);
}

let userScore = 0;
let computerScore = 0;

function playerWins(userChoice, computerChoice) {
  return (userChoice === 'rock' && computerChoice === 'scissors') ||
         (userChoice === 'rock' && computerChoice === 'lizard') ||
         (userChoice === 'paper' && computerChoice === 'rock') ||
         (userChoice === 'paper' && computerChoice === 'spock') ||
         (userChoice === 'scissors' && computerChoice === 'paper') ||
         (userChoice === 'scissors' && computerChoice === 'lizard') ||
         (userChoice === 'lizard' && computerChoice === 'paper') ||
         (userChoice === 'lizard' && computerChoice === 'spock') ||
         (userChoice === 'spock' && computerChoice === 'rock') ||
         (userChoice === 'spock' && computerChoice === 'scissors');
}
function displayWinner(userChoice, computerChoice) {
  if (playerWins(userChoice, computerChoice)) {
    prompt('You win!');
  } else if (userChoice === computerChoice) {
    prompt("It's a tie!");
  } else {
    prompt("Computer wins!");
  }
}

function keepScore(userChoice, computerChoice) {
  if (playerWins(userChoice, computerChoice)) {
    userScore += 1;
  } else if (userChoice === computerChoice) {
    userScore += 0;
  } else {
    computerScore += 1;
  }
}

prompt("Welcome to Rock, Paper, Scissors, Lizard, Spock!  Best of five wins the tournament!");

while (true) {
  prompt(`Choose one: ${VALID_CHOICES.join(', ')}`);
  let userChoice = readline.question();


  while (!VALID_CHOICES.includes(userChoice)) {
    prompt("That is not a valid choice.  Please choose rock, paper, scissors, lizard, or Spock.");
    userChoice = readline.question();
  }

  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];
  displayChoice(userChoice, computerChoice);
  displayWinner(userChoice, computerChoice);
  keepScore(userChoice, computerChoice);
  prompt(`Your score is ${userScore}. Computer score is ${computerScore}`);


  if (userScore === 3) {
    prompt('You won best of 5!  You win the tournament!');
  } else if (computerScore === 3) {
    prompt('computer won best of 5.  Computer wins the tournament');
  }

  prompt('Do you want to play again (y/n)?');
  let answer = readline.question().toLowerCase();
  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }

  if (userScore === 3) {
    userScore = 0;
    computerScore = 0;
  } else if (computerScore === 3) {
    userScore = 0;
    computerScore = 0;
  }

  if (answer[0] !== 'y') break;
}