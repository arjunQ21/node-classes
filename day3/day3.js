var cryptoData = {
    date: "21 may, 2024",
    currencies: [
        {
            'name': "BitCoin",
            "exchangeRate": 97000,
            'foundIn': '2005'
        },
        {
            'name': "Ethereum",
            "exchangeRate": 3200,
            'foundIn': '2013'
        },
        {
            'name': "DogeCOIN",
            "exchangeRate": 0.32,
            'foundIn': '2016'
        },
        {
            'name': "Stack",
            "exchangeRate": 2.2,
            'foundIn': '2019'
        }
    ],
}

// About mapping

// let list = [1, 2, 3, 4]

// let newList = [];

// for (let item of list) {
//     newList.push(item * (item % 2 == 0 ? 1 : -1) )
// }

// console.log(newList)

// let newList = list.map(function(item) {return item * 2})

// let newList = list.map(function (item) { return item * (item % 2 == 0 ? 1 : -1) })

// console.log(newList)

// Task 16: Create an object of crypto names and their rates
// Create a new object where each property is the name of a cryptocurrency, and the value is its exchange rate.

let newData = {}

cryptoData.currencies.forEach(function (item) {
    newData[item.name] = item.exchangeRate
})

console.log(newData)