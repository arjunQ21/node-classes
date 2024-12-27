import express from 'express'
import { config } from 'dotenv';
import { getCurrentViews, increaseViews } from './helpers/views.js';
config();

const server = new express();


server.get("/", function (req, res) {
    res.send("Views App.")
})

server.get("/views", function (req, res) {
    res.send(getCurrentViews())
})

server.get("/views/increase", function (req, res) {
    res.send(increaseViews())
})




const port = process.env.PORT || 3000 ;

server.listen(port, function () {
    console.log("Server running on port", port)
})