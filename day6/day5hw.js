async function countdown (from) {
    return new Promise(function (resolve, reject) {
        if (from === undefined) reject("Please provide some value.");
        const interval = setInterval(function () {
            if (--from == 0) {
                resolve("सकियो ✅.")
                clearInterval(interval);
            } else {
                console.log(from, "sec remaining.");
            }
        }, 1000)
    });
}


countdown(10).then(function (r) {
    console.log(r)
}).catch(function (e) {
    console.error(e)
})