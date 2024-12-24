
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

console.log("Run vayo")
duiSecondPaxiVanxu
    .then(function (value) {
        console.log("Aayo: " + value)
    })
    .catch(function (e) {
        console.log("Error vayo:", e)
    })