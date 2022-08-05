//Welcome the user
//Ask the user for their first number
//Ask the user for their second number
//Convert the input from strings back to numbers
//Ask for the operation to perform
//Perform the operation on the user's two numbers
//Print the result in a user-friendly way "Your result is"  Don't just say the number

const readline = require('readline-sync');
console.log("Welcome to the calculator!");

console.log("What is your first number?");
let number1 = readline.question();

console.log("What is your second number?");
let number2 = readline.question();

console.log("What operation would you like to perform? \n1) Add  2) Subtract  3) Multiply  4) Divide");
let operation = readline.question();

let output;
if (operation ==='1') { // this means add
output = Number(number1) + Number(number2);
} else if (operation ==='2') { // this means subtract
  output = Number(number1) - Number(number2);
} else if (operation ==='3') { // this means multiply
  output = Number(number1) * Number(number2);
} else if (operation ==='4') { // this means divide
  output = Number(number1) / Number(number2);
}

console.log(`The result is ${output}`);