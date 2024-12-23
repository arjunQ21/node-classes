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

// sort currencies by exchange rate in descending order
// How sorting works
// var list = [1, 2, 3, -1, 8, 12, 4, 56, 32]

// var cars = ['tesla', 'lamborghini', 'byd', 'ferrari', 'bmw', 'neta']

// // list.sort(function(first, second){ return 0 } );

// cars.sort(function (euta, arko) {
    

//     var surkoFirstLetter = euta.charCodeAt( euta.length - 1 )
//     var arkoFirstLetter = arko.charCodeAt( arko.length - 1 )

//     // console.log({ surkoFirstLetter, arkoFirstLetter })
//     return surkoFirstLetter - arkoFirstLetter;


// })

// console.log(cars)


// Solution for currencies

cryptoData.currencies.sort(function (euta, arko) {
    return arko.exchangeRate - euta.exchangeRate
})

// console.log(cryptoData.currencies)

// Removing item from list
// var cars = ['tesla', 'lamborghini', 'byd', 'ferrari', 'bmw', 'neta']

// // delete cars[2]
// cars.splice(cars.indexOf("byd"), 1)

// console.log(cars)

// removing dogecoin from list
cryptoData.currencies.splice(cryptoData.currencies.indexOf({ name: "DogeCOIN" }), 1)

// console.log(cryptoData.currencies)

