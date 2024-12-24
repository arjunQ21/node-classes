/**
 * Chain callbacks with mathematical operations: Create a function chainCalculate that takes two numbers and two callbacks. The first callback performs an operation (e.g., addition), and the second callback uses the result to perform another operation (e.g., multiplication by 2).
 */

const add1 = (num1, num2) => num1 + num2;

const mulitiplyBy2 = (num) => num * 2;

function chainCalculate (num1, num2, cb1, cb2) {
    const firstResult = cb1(num1, num2);
    return cb2(firstResult);
}

console.log(chainCalculate(2, 3, add1, mulitiplyBy2))

/**Pass callbacks dynamically: Write a function chooseOperation that takes a string ('add', 'subtract', 'multiply', 'divide') and dynamically assigns one of your predefined calculation functions (like add or subtract) to a callback. Use this callback to calculate the result for two numbers.
 */

function add (num1, num2) {
    console.log(`The sum of ${num1} and ${num2} is ${num1 + num2}.`);
}

function subtract (num1, num2) {
    console.log(`The difference of ${num1} and ${num2} is ${num1 - num2}.`);
}
function multiply (num1, num2) {
    console.log(`The product of ${num1} and ${num2} is ${num1 * num2}.`);
}
function divide (num1, num2) {
    if (num2 == 0) throw new Error("Divide by zero Exception.");
    console.log(`The quotient of ${num1} and ${num2} is ${num1 / num2}.`);
}

const functionNames = ['add', 'subtract', 'multiply', 'divide']
const functions = [add, subtract, multiply, divide]

function callByString (functionName = 'subtract') {
    for (let i = 0; i < functions.length; i++){
        if (functionNames[i] === functionName) {
            functions[i](2, 3)
        }
    }
    
}

callByString()