const dolphin = 'dolphin'
const cars = ['tesla', "bmw",`AUIDv${10.4/2}`, 'byd'+ " "+ dolphin, `byd ${dolphin}`];


// add item to end of list
cars.push("Tesla Cybertruck")
showCars("After adding item to end") ;

// add item to start of the list
cars.unshift("Tesla Roadster")
showCars("after adding item at the beginning") ;

// Remove item from start of the list
let removedCar = cars.shift()
showCars(`After removing ${removedCar} from the beginning.`) ;

// Remove item from start of the list
let removedCarLast = cars.pop()
showCars(`After removing ${removedCarLast} from the end.`) ;

function showCars(actionName){
    console.log("\nCar List "+ actionName)
    console.log("============")
    for(let carName of cars){
        console.log(carName)
    }
    console.log("\n")
}
