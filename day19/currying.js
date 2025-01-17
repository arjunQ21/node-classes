function curriedSum (a) {
    return function (b) {
        if (b !== undefined) {
            return curriedSum(a + b); // Continue adding numbers
        }
        return a; // Return the final sum when no argument is passed
    };
}


const sum3 = curriedSum(3);



// Usage:
const sum = curriedSum(1)(2)(3)(4)(5)(); // 10
console.log(sum); // Output: 10

console.log(sum3(6)())

function print (str) {
    return console.log(str)
}

// IIFE
(function () { print("Helloo") })();


async function waitFor (seconds) {
    return new Promise(function (resolve, reject) {
        const t = setTimeout(function () {
            resolve()
            clearTimeout(t)
        }, seconds * 1000)
    })
}

(async function () {
    console.log("Waiting for 3 seconds.")
    await waitFor(3);
    console.log("Waited for 3 seconds.")
})()
