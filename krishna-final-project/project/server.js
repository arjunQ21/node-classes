import { config } from 'dotenv';
import express from 'express';
import connectToMongoDB from './connect.js';
import mainRoutes from './routes/routes.js';
import captureUserAuthToken from './middlewares/captureUserauthToken.js';

const app=express();
config();
const port=process.env.PORT|| 4000

app.use(express.json());
  

connectToMongoDB().then(function (connectMessage){
    console.log(connectMessage);
    // app.use(captureUserAuthToken)
    app.use(mainRoutes)
    app.listen(port,()=>{
        console.log("Server running on PORT : "+port)
    })
}).catch((e)=>{
    console.log("Error:"+e)
})