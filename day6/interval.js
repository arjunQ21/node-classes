// printing seconds in console till 10 seconds.

let seconds = 0;
const intrvl = setInterval(function () {
    console.log(seconds++, " seconds.")
    if (seconds == 11) {
        clearInterval(intrvl);
    }
}, 1000)