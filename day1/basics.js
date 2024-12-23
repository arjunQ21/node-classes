function calculate(number1, number2, operator){
    switch( operator ){
        case '+':
            return number1 + number2 ;
        case '-':
            return number1 - number2 ;
        case '*':
            return number1 * number2 ;
        case '/':
            if(number2 == 0){
                console.log("Cannot divide by 0") ;
                return ;
                
            }else{
                return number1 / number2 ;
            }
        default:
        throw new Error("Invalid operator: "+ operator)
    }
}

 var operators =  ['+', '-', '*', '/'];
 
 for(let d of operators){
    //  console.log(operators[i], i)
     console.log(calculate(1, 0, d))
     
 }


