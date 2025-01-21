import connectToDB from './connect.js'
import Bus, { insertBus } from './models/bus.js'
import Car, { insertCar } from "./models/car.js"


connectToDB().then(async function (connectMessage) {
    console.log(connectMessage)



    let firstCar = await Car.findOne({});

    if (!firstCar) {
        firstCar = await insertCar({ name: "Suzuki", price: 54000, manufacturer: "Nepal", makeYear: "2018" })
    }

    let firstBus = await Bus.findOne({ relatedCar: { $ne: null } }).populate("relatedCar", "name").exec()

    console.log({ firstBus })

}).catch(function (err) {
    console.error(err)
})