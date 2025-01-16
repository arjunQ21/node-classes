import express from 'express'
import { config } from 'dotenv';
import { getCurrentViews, increaseViews, addTask, removeTask } from './helpers/views.js';

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
    try {
        return res.json(addTask(req.params.task));
    } catch (e) {
        return res.status(400).json({ error: e.message })
    }
})

server.get("/views/todo/remove/:task", function (req, res) {
    try {
        return res.json(removeTask(req.params.task));
    } catch (e) {
        return res.status(400).json({ error: e.message })
    }
})

server.get("/verify-token", function (req, res) {
    let message = "";
    try {
        let token = req.query.token;
        if (!token) throw new Error("Token not found.");
        token = parseInt(token);
        const users = ['Ram', 'Hari', "Shyam", "Gita", "Sita", "Radha"];
        if (!token || token < 0 || token >= users.length) throw new Error("Invalid token");

        const verifiedUser = users[token];

        if (verifiedUser) {

            message = `Congratulations, ${verifiedUser}. Your are now verified.`;

        } else {
            throw new Error("Could not verify user.");
        }
    } catch (e) {
        message = `Error verifying: ${e.message}.`
    } finally {
        res.set('Content-Type', 'text/html');
        return res.send(`<h2>My Verification Site</h2>
            <br />
            <p>${message}</p>`);
    }
})



const port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log("Server running on port", port)
})