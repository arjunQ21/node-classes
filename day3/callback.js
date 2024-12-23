function add (num1, num2) {
    console.log(`The sum of ${firstNumber} and ${secondNumber} is ${num1 + num2}.`) ;
}

function subtract (num1, num2) {
    console.log(`The difference of ${firstNumber} and ${secondNumber} is ${num1 - num2}.`) ;
}
function multiply (num1, num2) {
    console.log(`The product of ${firstNumber} and ${secondNumber} is ${num1 * num2}.`) ;
}
function divide (num1, num2) {
    if (num2 == 0) throw new Error("Divide by zero Exception.");
    console.log(`The quotient of ${firstNumber} and ${secondNumber} is ${num1 / num2}.`) ;
}

const firstNumber = 4;
const secondNumber = 5;

// add(firstNumber, secondNumber)

function calculate (num1, num2, calculationFunction) {
    return calculationFunction(num1, num2);
}

calculate(firstNumber, secondNumber, subtract)