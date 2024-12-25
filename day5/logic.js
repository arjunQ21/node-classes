// Make yesterday's task run continuously in interval of 2 seconds for 20 secnods.

const giveMeSomeNumber = () => new Promise(function (resolve, reject) {
    const timeOut = setTimeout(function () {
        const randomNumber = parseInt(Math.random() * 100);
        if (randomNumber % 10 === 0) {
            reject(new Error("Got " + randomNumber))
        } else {
            resolve(randomNumber);
        }
        clearTimeout(timeOut)
    }, 2000)
})

// Async /Await Solution with loop

async function runIterations () {

    for (let i = 0; i < 10; i++) {
        console.log("Iteration: " + (i + 1))
        try {
            const number = await giveMeSomeNumber()
            console.log(number)
        } catch (e) {
            console.error(e);
        }
    }

}

// Running above solution
// runIterations();


// Using recursion
let times = 0;
async function runIterationsRecursively () {
    try {
        const number = await giveMeSomeNumber()
        console.log(number)
    } catch (e) {
        console.error(e);
    }
    times++;
    if (times < 10) {
        runIterationsRecursively();
    }
}

runIterationsRecursively();