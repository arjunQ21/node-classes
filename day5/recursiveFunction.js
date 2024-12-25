// write a function that returns sum of numbers upto a certain limit
// Using Iteration
function sumOfNumbersUpto (number) {
    let sum = 0;
    let i = 0;
    while (i++ < number) {
        sum += i;
    }
    return sum;
}

// const n = 5

// console.log("Sum of numbers till "+ n + " is "+ sumOfNumbersUpto(n) )

// Using recursion
function rSumOfNumbersUpto (number) {
    if (number == 1) {
        return 1;
    } else {
        return number + rSumOfNumbersUpto(number - 1);
    }
}

/**
 * number = 1, sum1 = 1
 * number = 2, sum2 = 1+2 = 3, OR 2 + sum1 = 3
 * number = 3, sum3 = 1+2+3 = 6, OR 3 + sum2 = 6
 * number = 4, sum4 = 1+2+3+4 = 10, OR 4 + sum3 = 10
 */

const nr = 5

console.log("Sum of numbers till "+ nr + " is "+ rSumOfNumbersUpto(nr) )