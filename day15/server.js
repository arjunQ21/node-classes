import express from 'express'
import connectToDB from './connect.js'
import requestLogger from './middlewares/requestLogger.js'
import routes from './routes/index.js';
import captureUserFromAuthToken from './middlewares/captureUserFromAuthToken.js';
import cors from "cors"
let app;

connectToDB().then(function (connectMessage) {
    console.log(connectMessage)
    app = express();
    // app.use(helmet({
    //     contentSecurityPolicy: {
    //         directives: {
    //             defaultSrc: ["'self'"],
    //             connectSrc: ["'self'", "http://localhost:3001"], // Allow connections to your backend
    //             // Add other directives as needed
    //         },
    //     },
    // }))
    app.use(cors())
    app.use(express.json())
    app.use(captureUserFromAuthToken);
    app.use(routes);
    app.use(requestLogger)
    const port = process.env.PORT || 4000;
    app.listen(port, function () {
        console.log("Server running on PORT", port)
    })
}).catch(function (err) {
    console.error(err)
})

export default app;
