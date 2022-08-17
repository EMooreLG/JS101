// welcome the user
// ask user for the loan amount
// ask user for the interest rate
// ask user for loan duration
// calculate duration in months by multiplying duration by 12
// calculate annual interest rate by dividing interest rate by 100
// calculate  monthly interest rate by dividing annual interest rate by 12

//  use the formula let m = p * (j / (1 - Math.pow((1 + j), (-n)))) 
// to calculate monthly payment
// print payment as a dollar and cents amount (use .toFixed(2)?)

const readline = require('readline-sync');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() <= 0 || Number.isNaN(Number(number));
}


console.log("$$$$$  Welcome to the Loan Calculator!! $$$$$");

while (true) {
  prompt("What is your loan amount in US dollars and cents? Please do not use dollar signs or commas. ");
  let loanAmount = readline.question();

while (invalidNumber(loanAmount)) {
  prompt("I'm sorry that does not appear to be a valid loan amount.  \n=> As an example, use 5000 for $5,000.");
  loanAmount = readline.question();
}

prompt("What is the annual interest rate on your loan?  Please do not use a percentage sign.");
  let apr = readline.question();

while (invalidNumber(apr)) {
  prompt("I'm sorry that does not appear to be an annual percentage rate.  \n=> As an example, use 5 for 5% or 2.5 for 2.5%.");
  apr = readline.question();
}

prompt("How many years is your loan duration? \n=> Remember!  6 months is .5 years!  3 months is .25 years!");
  let loanYears = readline.question();

while (invalidNumber(loanYears)) {
  prompt("I'm sorry that does not appear to be a valid loan duration.  Please enter the number of years.");
  loanYears = readline.question();
}


let loanMonths = (loanYears * 12);
let annualInterest = (apr / 100);
let monthlyInterest = (annualInterest / 12);

let payment = loanAmount * 
(monthlyInterest / (1 - Math.pow((1 + monthlyInterest), (-loanMonths))));

let monthlyPayment = payment.toFixed(2);

console.log(`Your monthly payment will be $${monthlyPayment}.`);

prompt('Would you like to do another calculation? (y/n)');
  let answer = readline.question();
  if (answer !== 'y') break;
}