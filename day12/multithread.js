// simulation of multithreading using promises
const tableOf = (n, interval) => {
    return new Promise(function (resolve, reject) {
        console.log("Table of " + n + ".")
        let count = 0;
        const intrvl = setInterval(function () {
            if (count == 9) {
                resolve("Table of " + n + " ended.");
                clearInterval(intrvl);
            }
            console.log(`${n}*${++count}=${n * count}`)
        }, interval)
    })
}

async function runLines () {
    console.log("Hello0")
    await tableOf(5, 200).then((e) => console.log(e))
    console.log("Hello")
    tableOf(6, 100).then((e) => console.log(e))
    console.log("Hello1")
}

runLines();