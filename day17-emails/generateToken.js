function sixDigitToken () {
    const random = (100000 + parseInt(Math.random() * 1000000)).toString();
    if (random.length !== 6) return sixDigitToken();
    else return random;
}

for (let i = 0; i < 20; i++){
    let token = sixDigitToken();
    console.log(token, token.length === 6 )
}