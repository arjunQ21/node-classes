import { config } from "dotenv";
import nodemailer from "nodemailer";
import readLine from 'readline'

import EventEmitter from "node:events"

config();

// console.log(process.env)

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
});

const completionListener = new EventEmitter();

// async..await is not allowed in global scope, must use a wrapper
async function main () {
    const token = "808745";
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Test User" <node-class@padxu.com>', // sender address
        to: "arjunq21@gmail.com", // list of receivers
        subject: "Test Email " + parseInt(Math.random() * 100), // Subject line
        text: "Hello world?", // plain text body
        html: `<p>Dear User, <br /> Use this code to verify your email: 
        <b style='font-size: 20px;'>${token} </b>
        <br />
        Dont share this email with others.</p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);

    completionListener.emit("completed")

    return info;
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

function showLoader () {
    const startedAt = + new Date();
    return new Promise(function (resolve, reject) {
        const intervl = setInterval(function () {
            const elapsedTime = (+ new Date()) - startedAt;
            readLine.cursorTo(process.stdout, 0);
            process.stdout.write("Waited for: " + (elapsedTime / 1000) + "s.")
        }, 500)
        completionListener.on("completed", function () {
            console.log("Loading Completed.")
            clearInterval(intervl);
        })
    })
}




Promise.race([main(), showLoader()]).then((r) => console.log(r)).catch(console.error);

