const duiSecondPaxiVanxu = new Promise(function (resolve, reject) {
    // Only one of resolve or reject will be called
    // When resolve is called first, reject will never be called and vice versa

    const interval = setTimeout(function () {
        resolve(1)
        clearTimeout(interval);
    }, 2000)
    const intervall = setTimeout(function () {
        reject(("Vayo, vandina"))
        clearTimeout(intervall);
    }, 1900)
})

/**
 * Two keywords:
 * async: Used to define the type of a function, that it takes some time to complete i.e, to resolve a value
 * await: To wait till some async function completes with a value or fails with an error
 */

// how to make async functions
// way 1
async function functionName () { }

// way 2
const functionName2 = async function () { }

// way 3
const functionName3 = async () => { }

// Where can we call async functions?
// => They can be called from anywhere in the code

// Where can the value from async function be awaited?
// OR Where can we use the 'await' keyword
// => 'await' can be used only inside a function that is declared async

async function runAboveCode () {
    console.log("Run vayo")
    try {
        console.log(await duiSecondPaxiVanxu);
    } catch (e) {
        console.log("Error: ", e);
    }
}

runAboveCode();
