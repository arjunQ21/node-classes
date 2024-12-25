// Create an async function which resolves when its 20 seconds on the clock

function showCurrentDate () {
    const date = new Date();
    console.log(`Its ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} now.`)
}

const waitTill20thSecond = () => new Promise(function (resolve, reject) {

    const intrvl = setInterval(function () {
        if (new Date().getSeconds() === 20) {
            resolve(20);
            clearInterval(intrvl);
        } else {
            showCurrentDate();
        }
    }, 1000)
})

/**
 * Sample Output:
 * Waiting till 20th second.
 * Its 3:03:20 now.
 */

async function runThis () {
    console.log("Waiting till 20th second.");
    await waitTill20thSecond();
    showCurrentDate();
}
runThis();