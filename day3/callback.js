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

const firstNumber = 4;
const secondNumber = 5;

// add(firstNumber, secondNumber)

function calculate (num1, num2, calculationFunction) {
    return calculationFunction(num1, num2);
}

// passing callback function with prefedined function names
calculate(firstNumber, secondNumber, subtract)

// Anonymous functions
// adding 10 to given numbers using anonymous function
calculate(firstNumber, secondNumber, function (a, b) {
    console.log(`10 added to ${firstNumber} and ${secondNumber} is ${a + b + 10}.`);
})

// Arrow Functions
calculate(firstNumber, secondNumber, (a, b) => {

    console.log(`10 added to ${firstNumber} and ${secondNumber} is ${a + b + 10}.`)
}
)


let functionHolder ;
// assign a function defined above(one of 4 calculation functions) to this variable
// call that function for values 9 and 10, by the name of the variable functionHolder

functionHolder = (a, b) => {

    console.log(`10 added to ${a} and ${b} is ${a + b + 10}.`)
};
functionHolder(9, 10);

functionHolder = subtract
functionHolder(9, 10)



