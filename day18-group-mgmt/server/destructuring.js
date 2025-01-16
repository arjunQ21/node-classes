// Creating variables from objects

// > var a = {"name": "Hari", "age": 34, "addresss": "Lamachaur"} ;
// undefined
// > a.name
// 'Hari'
// > a.age
// 34
// > const {name} = a ;
// undefined
// > name
// 'Hari'
// > const age = a.age
// undefined
// > age
// 34
// > a['school'] = "LA Grandee"
// 'LA Grandee'
// > a
// { name: 'Hari', age: 34, addresss: 'Lamachaur', school: 'LA Grandee' }
// > const {school, addresss} = a ;
// undefined
// > school
// 'LA Grandee'
// > addresss
// 'Lamachaur'


// Creating object from variables
// > var drinks = 'water'
// undefined
// > var eats = 'rice'
// undefined
// > var user = 'Shyam'
// undefined
// > const details = { user, drinks, eats, addresss }
// undefined
// > details
// { user: 'Shyam', drinks: 'water', eats: 'rice', addresss: 'Lamachaur' }