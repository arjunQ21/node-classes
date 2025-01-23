import {config} from 'dotenv';
import express from 'express';
import connectToDB from './connect.js';
import userRouter from './routes/user.js';
import groupRouter from './routes/group.js';
import messageRouter from './routes/message.js';

config();

const port = process.env.PORT || 3002 || 4000 || 8005;
const server = express();


connectToDB().then(function (connectMessage) {
console.log(connectMessage)
server.use(express.json())

server.use(userRouter)
server.use( groupRouter); 
server.use( messageRouter); 

server.use( "/message/file", express.static("message/file", ))


server.listen(port , ()=>{

  console.log("Server connected on port ---- "+ port)
})
})
.catch(function (error){
  console.error(error)
})
