function sumOfDigits(number){

    let sum = 0 ;
    while(number > 0){
        let lastDigit = number % 10 ;
        number = parseInt(number / 10)
        sum += lastDigit ;
    }

    return sum ;

}

// (int) 5.6 ;

console.log(sumOfDigits(234))