import bcrypt from 'bcrypt'

// import { getMetaData, updateMetaData } from "./models/cryptoMetadata.js";

// import connectToDB from "./connect.js"

// connectToDB().then(function (connectMessage) {
//     console.log(connectMessage)

//     return getMetaData().then(m => console.log(m)).catch(e => console.error(e))
// }).catch(function (err) {
//     console.error(err)
// })


// let i = 0;

// async function hash (text) {
//     const hashed = await bcrypt.hash(text, 10);
//     console.log(hashed + 
//         "\n\n"
//     )
//     if (i++ < 10) {
//         await hash(text);
//     }
// }


// hash("Krishna")

// bcrypt.compare("Krishna", "$2b$10$HznnxIY/hypFKvcDVW6hXO04VC.of0dIGYt.xa4qVVzh8svIySMEm").then(function (e) {
//     if (e) {
//         console.log("matched")
//     } else {
//         console.log("not matched")
//     }
// })


