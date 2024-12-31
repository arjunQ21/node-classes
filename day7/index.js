import express from 'express'
import { config } from 'dotenv';
import { getCurrentViews, increaseViews } from './helpers/views.js';
config();

const server = new express();

server.use(express.json())

server.get("/", function (req, res) {
    res.send("Views App.")
})

server.get("/views", function (req, res) {
    res.send(getCurrentViews())
})

server.get("/views/increase", function (req, res) {
    res.send(increaseViews())
})

server.get("/views/todo/add/:task", function (req, res) {
    const request = {};
    request['body'] = req.body 
    request['headers'] = req.headers 
    request['params'] = req.params 
    request['query'] = req.query 
    res.send(request);
})



const port = process.env.PORT || 3000 ;

server.listen(port, function () {
    console.log("Server running on port", port)
})