// In Arrays

var array = [1, 2, 3, 4];

// add new item to array
array.push(5) 

// add using spread operator
array = [ ...array, 6, 7, 8]


var numbers = [9, 10, 11, 12]

array = [...array, ...numbers, 13, 14]

console.log(array)

const [firstNumber, secondNumber] = array

console.log({ firstNumber, secondNumber })

// In Objects
var car = { "make": "2017", 'model': "S" }
// add new property to this object:
car['manufacturer'] = 'tesla'

var engineDetails = {
    'type': "petrol", 
    'capacity': '100L'
}

// add new properties from another object
car = { ...car, engineDetails }

console.log({car})
