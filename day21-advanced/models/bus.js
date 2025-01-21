import { model, Schema } from "mongoose";

const busSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    seats: {
        type: Number,
        required: true,
    },
    relatedCar: {
        type: Schema.Types.ObjectId,
        ref: "Car"
    }
}, { timestamps: true })

const Bus = model("Bus", busSchema);

async function insertBus ({ name, seats, relatedCar }) {
    return Bus.create({name, seats, relatedCar})
}



export {insertBus}

export default Bus;