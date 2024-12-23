
const topNumber = 50 ;
const rowDifference = 10 ;

let mainNumber = topNumber ;

do{
    let columnCount = (topNumber+rowDifference - mainNumber) / rowDifference ;

    let toPrint = mainNumber + "" ;
    
    for(let i = 1 ; i < columnCount; i++){
        toPrint = toPrint +"\t"+ (mainNumber - i)
    }
    console.log(toPrint) ;

   mainNumber -= rowDifference ;

}while(mainNumber >= rowDifference )