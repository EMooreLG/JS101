//Welcome the user
//Ask the user for their first number
//Ask the user for their second number
//Convert the input from strings back to numbers
//Ask for the operation to perform
//Perform the operation on the user's two numbers
//Print the result in a user-friendly way "Your result is"  Don't just say the number

const readline = require('readline-sync');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

prompt("Welcome to the calculator!");

prompt("What is your first number?");
let number1 = readline.question();

while (invalidNumber(number1)) {
  prompt("I'm sorry that does not appear to be a valid number.  What is your first number?")
  number1 = readline.question();
}

prompt("What is your second number?");
let number2 = readline.question();

while (invalidNumber(number2)) {
  prompt("I'm sorry that does not appear to be a valid number.  What is your second number?")
  number2 = readline.question();
}

prompt("What operation would you like to perform? \n1) Add  2) Subtract  3) Multiply  4) Divide");
let operation = readline.question();

while (!['1', '2', '3', '4'].includes(operation)) {
  prompt("I'm sorry.  You must choose 1, 2, 3, or 4.");
  operation = readline.question();
}

let output;
switch(operation) {
  case '1':
    output = Number(number1) + Number(number2);
    break;
  case '2':
    output = Number(number1) - Number(number2);
    break;
  case '3':
    output = Number(number1) * Number(number2);
    break;
  case '4':
    output = Number(number1) / Number(number2);
    break;
} 
prompt(`The result is ${output}`);