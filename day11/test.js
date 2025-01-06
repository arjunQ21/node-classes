import { getMetaData, updateMetaData } from "./models/cryptoMetadata.js";

import connectToDB from "./connect.js"

connectToDB().then(function (connectMessage) {
    console.log(connectMessage)

    return getMetaData().then(m => console.log(m)).catch(e => console.error(e))
}).catch(function (err) {
    console.error(err)
})


