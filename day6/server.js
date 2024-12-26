import express from 'express';

const server = new express();

server.get("/", function (req, res) {
    // console.log(req);
    res.send(req.query)
    
})

server.listen(500, function () {
    console.log("Server running on port 500")
})